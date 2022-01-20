import { makeStyles } from '@mui/styles';

// makeStyles
const useStyles = makeStyles({
	navBar: {
		// backgroundColor: '#f34222',
		'& a': {
			color: '#fff',
			marginLeft: 10,
		},
		display: 'flex',
		flexDirection: 'initial'
	},
	navActions: { margin: 'auto' },
	grow: {
		flexGrow: 1
	},
	brand: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	main: {
		minHeight: '80vh'
	},
	footer: {
		marginTop:10,
		textAlign: 'center',
		fontWeight: 'bold'
	},
	section:{
		marginTop:10,
		marginBottom:10
	}
});

export default useStyles;
