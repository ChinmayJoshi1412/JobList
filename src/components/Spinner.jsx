import ClipLoader from 'react-spinners/ClipLoader';

const Override = {
    display: 'block',
    margin: '100px auto'
}

const Spinner = ({loading}) => {
  return (
    <ClipLoader
        color='#4338ca'
        loading={loading}
        cssOverride={Override}
        size={150}
      />
  )
}

export default Spinner