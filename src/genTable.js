const table = (columnArr, nama)=>{
	const isLoading = nama ? 'is' + nama + 'TableLoading' : 'isTableLoading'
	const dataSource = nama ? nama + 'DataSource' : 'dataSource'
	const pager = nama ? nama + 'Pager' : 'pager'
	const change_cb = nama ? nama + 'TableChange_cb' : 'tableChange_cb'
	const columns = nama ? nama + 'Columns' : 'columns'
	const tmpl =
`		<b-section>
			<b-table
				:loading="${isLoading}"
				:data-source="${dataSource}"
				:columns="${columns}"
				:pagination="${pager}"
				@change="${change_cb}"
			>
				<!-- <template #title /> -->
			</b-table>
		</b-section>
`
	const js =
`


const ${columns} = ref([])
const ${change_cb} = (pagination, filters, sorter) => {}

`
	return [tmpl, js]

}

export default table