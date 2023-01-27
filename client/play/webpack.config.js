import path from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export default  {
	mode:"development",
	entry:"./src/game-menu.js",
	output:{
		path:path.resolve(__dirname,'dist'),
		filename:"output.js",
		library:{
			type:"module"
		}
	},
	experiments: {
		outputModule: true,
	},
	plugins: [
		new webpack.EnvironmentPlugin({
			API:"https://backend-space-shooter.vercel.app"
		})
	]
}