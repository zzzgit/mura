import parseFormItemStr from './parseFormItemStr'

const formItem = (fieldStr, modelName)=>{
	const field = parseFormItemStr(fieldStr)
	let control = null
	if (!field.type){
		field.type = 'text'
	}
	if(field.type === 'select' || field.type === 's'){
		control = `<b-select v-model:value="${modelName}.${field.name}" addon-before="${field.label}"></b-select>`
	}else if (field.type === 'range' || field.type === 'r'){
		control = `<b-range-picker v-model:start-time="${modelName}.${field.start}" v-model:end-time="${modelName}.${field.end}" addon-before="${field.label}" />`
	}else if (field.type.includes('wild:') || field.type.includes('w:')){
		const forType = field.type.split(':')[1]
		let label = field.label
		if(!label){
			if(forType === 'time'){
				label = '时间'
			}else if(forType === 'data'){
				label = '数据类型'
			}else if(forType === 'product'){
				label = '产品'
			}else if(forType === 'package'){
				label = '上架包'
			}else if(forType === 'channel'){
				label = '渠道类型'
			} else if (forType === 'game'){
				label = '游戏'
			}else if (forType === 'bank'){
				label = '服务器'
			}else if (forType === 'VIP等级'){
				label = '服务器'
			}else if (forType === 'device'){
				label = '设备类型'
			}
		}
		control = `<b-select-wild for="${forType}" v-model:value="${modelName}.${field.name}" addon-before="${label}"></b-select-wild>`
	} else {
		control = `<b-input v-model:value="${modelName}.${field.name}" addon-before="${field.label}"></b-input>`
	}
	const tmpl =
`<b-form-item name="${field.name || field.start}">
	${control}
</b-form-item>`
	return tmpl
}

export default formItem