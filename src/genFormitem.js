const formItem = (field, modelName, isLoose)=>{
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
		const label = field.label
		if(!label){
			// todo
			throw new Error('wild type must have label')
		}
		control = `<b-select-wild for="${forType}" v-model:value="${modelName}.${field.name}" addon-before="${label}"></b-select-wild>`
	} else {
		control = `<b-input v-model:value="${modelName}.${field.name}" addon-before="${field.label}"></b-input>`
	}
	const tmpl =
`<b-form-item name="${field.name}">
	${control}
</b-form-item>`
	return tmpl
}

export default formItem