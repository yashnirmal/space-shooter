import {useLocation} from 'react-router-dom'

export default function AfterPayment(){
	const location = useLocation()
	return (
		<div style={{"textAlign":'center'}}>
		{
			(location.search=='?success=true')?<h2 style={{color:"green"}}>Payment Successful!</h2>:<h2 style={{"color":"red"}}>Payment Unsuccessful!</h2>
		}
		</div>
	)
}