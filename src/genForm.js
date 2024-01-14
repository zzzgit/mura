import formItem from './genFormitem.js'
import parseFormStr from './parseFormStr.js'

const indent = (str)=>{
	return str.split('\n').map(line=>'\t' + line).join('\n')
}

const form = (formStr, nama)=>{
	const fields_arr = parseFormStr (formStr)
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
${fields_arr.map(field=>indent(formItem(field, model))).join('\n')}
<b-button-group-search @click="${clickFunc}" />
</b-form>
</b-section>
`
	const js =
`
<script>
import { ref,onMounted,inject } from 'vue'
import { xxx } from '../../js/api.js'
import { usePager } from '../../composable/pager'

export default {
	setup(){
		const smooth = inject('smooth')
		const ${model} = ref({
			${fields_arr.map(field=>{
		return `${field.name}: null `
	})}
		})
		const ${ref} = ref(null)
		const ${isLoading} = ref(false)
		const ${pager} = ref(usePager())
		const ${rules} =   { } 
		const ${data} = ref([])
		const ${fetchFunc} = ()=>{
			${ref}.value.validate().then(()=>{
				${isLoading}.value = true
				return xxx(${model}.value, ${pager}.value)
			}).then((data)=>{
				${pager}.value.current = data.current
				${pager}.value.total = data.total
				${data}.value = data.list
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