import formItem from './genFormitem.js'
import parseFormItemStr from './parseFormItemStr.js'

const indent = (str)=>{
	return str.split('\n').map(line=>'\t' + line).join('\n')
}

const form = (fieldsStr_arr, nama, isLoose)=>{
	const fields_arr = fieldsStr_arr.map(fieldStr=>parseFormItemStr(fieldStr, isLoose))
	const ref = nama ? nama + 'FormRef' : 'searchFormRef'
	const model = nama ? nama + 'FormModel' : 'searchFormModel'
	const rules = nama ? nama + 'ValidationRules' : 'validationRules'
	const data = nama ? nama + 'DataSource' : 'dataSource'
	const pager = nama ? nama + 'Pager' : 'pager'
	const fetchFunc = nama ? nama + 'TableData' : 'fetchMaintableData'
	const clickFunc = nama ? nama + 'SearchClick_cb' : 'searchClick_cb'
	const isLoading = nama ? 'is' + nama + 'TableLoading' : 'isTableLoading'
	const tmpl =
`<b-section bordered>
<b-form ref="${ref}" :model="${model}" :rules="${rules}">
${fields_arr.map(field=>indent(formItem(field, model, isLoose))).join('\n')}
<b-button-group-search @click="${clickFunc}" />
</b-form>
</b-section>
`
	const genModel = (isLoose)=>{
		if(isLoose){
			return ' '
		}
		return fields_arr.map(field=>{
			return `${ (field).name}: null `
		})
	}

	const js =
`
<script>
import { ref,onMounted,inject } from 'vue'
${isLoose && '//' }import { xxx } from '../../js/api.js'
import { usePager } from '../../composable/pager'

export default {
	setup(){
		const smooth = inject('smooth')
		const ${model} = ref({
			${genModel(isLoose)}
		})
		const ${ref} = ref(null)
		const ${isLoading} = ref(false)
		const ${pager} = ref(usePager())
		const ${rules} =   { } 
		const ${data} = ref([])
		const ${fetchFunc} = ()=>{
			${ref}.value.validate().then(()=>{
				${isLoading}.value = true
				${isLoose && '//' }return xxx(${model}.value, ${pager}.value)
			}).then((data)=>{
				${isLoose && '//' }${pager}.value.current = data.current
				${isLoose && '//' }${pager}.value.total = data.total
				${isLoose && '//' }${data}.value = data.list
			}).catch((err)=>{
				smooth(err)
			}).finally(()=>{
				${isLoading}.value = false
			})
		}
		const ${clickFunc} = ()=>{
			${fetchFunc}()
		}
		onMounted(()=>{
			${fetchFunc}()
		})
		return {
			${ref},
			${rules},
			${clickFunc},
			${fetchFunc},
			${pager},
			${data},
			${model}
		}
	}
}
</script>
`
	return [tmpl, js]
}

export default form