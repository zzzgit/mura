const parse = (raw, isAnonymous) => {
	const fields_arr = raw.split('.')
	const label = fields_arr[0]
	const name = isAnonymous ? 'foo' : fields_arr[1]
	const type = isAnonymous ? fields_arr[1] : fields_arr[2]
	if(!label || !name){
		// todo
		throw new Error('invalid form item')
	}
	const obj = {
		label: label.trim(),
		name: name.trim()
	}
	if(type){
		Object.assign(obj, {
			type: type.trim()
		})
	}
	return obj
}
// console.log(parse(raw, false))
export default parse