import Navbar from '../../components/Navbar';


const NoMatch = () =>{
    return(
        <>
          <Navbar />

          <div className="container-fluid mt-5 mt-lg-0 px-4 px-md-5 ">
            <div className="special-container py-5">
                <div className='h-50vh d-flex align-items-center justify-content-center'>
                    <h2 className='fs2 mt-5 text-dark text-opacity-25'>404 | Page Not Found</h2>
                </div>
            </div>
          </div>
        </>
    )
}

export default NoMatch