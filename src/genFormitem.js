const formItem = (field, modelName, isLoose)=>{
	console.log(222, field)
	let control = null
	if (!field.type){
		if(field.name === '數據'){
			field.type = 'w:data'
		}else if(field.name === '日期'){
			field.type = 'r'
		}else{
			field.type = 'input'
		}
	}
	if(['select', 's'].find((item)=>item === field.type)){
		control = `<b-select v-model:value="${modelName}.${field.name}" addon-before="${field.label}"></b-select>`
	}else if (['range', 'r'].find((item)=>item === field.type)){
		control = `<b-range-picker v-model:start-time="${modelName}.${field.start}" v-model:end-time="${modelName}.${field.end}" addon-before="${field.label}" />`
	}else if (['wild:', 'w:'].find((item)=> field.type.includes(item))){
		const forType = field.type.split(':')[1]
		const label = field.label
		if(!label){
			// todo
			throw new Error('wild type must have label')
		}
		control = `<b-select-wild for="${forType}" v-model:value="${modelName}.${field.name}" addon-before="${label}"></b-select-wild>`
	} else {
		// report un-recoginized type first
		control = `<b-input v-model:value="${modelName}.${field.name}" addon-before="${field.label}"></b-input>`
	}
	const tmpl =
`<b-form-item name="${field.name}">
	${control}
</b-form-item>`
	return tmpl
}

export default formItem