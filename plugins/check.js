export default ({ app }, inject) => {
	/* plugin to to evaluate falsy or truthy */
	inject('Check', params => {
		return (params !== null && params !== undefined && params !== false && params !== '') ? true : false
	})

	// check array for falsy or truthy
	inject('CheckA', params => {
		return (params !== null && params !== undefined && params !== false && params.length > 0) ? true : false
	})
}