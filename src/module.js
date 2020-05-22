console.log('module.js');
async function start() {
	return await Promise.resolve('Fuck You');
}
start().then(console.log);
