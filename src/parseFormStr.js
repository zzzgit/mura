const parse = (raw) => {
	raw = raw.trim()
	const isMultiLine = raw.includes('\n').length
	if(isMultiLine){
		return raw.split('\n').map(item=>{
			return item.trim()
		})
	}
	return raw.split(/ +/).map(item=>{
		return item.trim()
	})

}
// console.log(parse('ksa skksk.dkks.kdd cc  '))
export default parse