export default function ({ app, route, params, path, query, redirect, store }){

	const currentPath	= route.path
	const pathArray = currentPath.split('/')

	console.log(currentPath)

	if(currentPath.includes('in-solidarity-with-palestine-a-resource-guide-and-archive')){
		return redirect('/publications/in-solidarity-with-victims-of-violence-a-resource-guide-and-archive')
	}

}