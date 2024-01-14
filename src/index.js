#!/usr/bin/env node

import path from 'path'
import { fileURLToPath } from 'url'
import { program } from 'commander'
import { form, table, cform } from './engine.js'
import parseFormStr from './parseFormStr.js'
import { createRequire } from 'node:module'
import { readFromFile, writeToFile } from 'samael'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const __package = path.resolve(__dirname, '../package.json')

const require = createRequire(import.meta.url)
const pjson = require('../package.json')

const muraKey = 'mura'
const ensureJson = (json)=>{
	if (!json[muraKey]){
		json[muraKey] = {}
	}
}
const getDataModule = async(options)=>{
	let pathName = pjson[muraKey]?.formData
	if(process.env.mura_form_data){
		pathName = process.env.mura_form_data
	}
	if(options.path){
		pathName = options.path
	}
	if(!pathName){
		console.error('no data source specified, please set it by "mura config"')
		console.log(config_cmd.helpInformation())
		return null
	}
	if(!pathName.startsWith('/')){
		pathName = path.resolve(process.cwd(), pathName)
	}
	const module = await import(pathName)
	return module.default
}

program.name('mura').version(pjson.version, '-v, --version', 'output the current version')

program
	.command('form')
	.description('generate form from raw data')
	.option('-p, --path <string>', 'the path to the formData.js file')
	.option('-l, --loose', 'loose mode, no need to specify the type of the form item', true)
	.argument('[name]', 'the of the form')
	.action(async(name, options) => {
		const module = await getDataModule(options)
		if(!module){
			return null
		}
		const result = form(parseFormStr(module), name, options.loose)
		console.log('html:\n', result[0])
		console.log('js:\n', result[1])
	})
program
	.command('cform')
	.description('generate cform from raw data')
	.option('-p, --path <string>', 'the path to the cformData.js file')
	.option('-l, --loose', 'loose mode, no need to specify the type of the form item', true)
	.argument('[name]', 'the of the form')
	.action(async(name, options) => {
		const module = await getDataModule(options)
		if(!module){
			return null
		}
		const result = cform(parseFormStr(module), name, options.loose)
		console.log('html:\n', result[0])
		console.log('js:\n', result[1])
	})

program.command('table')
	.description('generate table from json data')
	.option('-p, --path <string>', 'the path to the tableData.js file')
	.argument('[name]', 'the of the table')
	.action((name, options) => {
		const result = table([], name)
		console.log('html:\n', result[0])
		console.log('js:\n', result[1])
	})

const config_cmd = program.command('config')
	.description('configure key-value pair in package.json')
	.argument('[key]', 'the key to set or get')
	.argument('[value]', 'the value to set.')
	.option('-u, --unset <string>', 'unset the key')
	.option('-l, --list', 'list all key-value pairs')
	.action(async(key, value, option) => {
		const content = await readFromFile(__package)
		const json = JSON.parse(content)
		ensureJson(json)
		if(option.list){
			const obj = json[muraKey]
			for (const key in obj){
				console.log(`${key}=${obj[key]}`)
			}
			return null
		}
		if(option.unset){
			delete json[muraKey][option.unset]
			await writeToFile(__package, JSON.stringify(json, null, 2))
			return null
		}
		if(!key){
			console.log(program.helpInformation())
			return null
		}
		// search for key
		if(!value){
			console.log(json[muraKey][key])
			return null
		}
		// set key
		json[muraKey][key] = value
		await writeToFile(__package, JSON.stringify(json, null, 2))
	})

program.parse(process.argv)
