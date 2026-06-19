import axios from 'axios'
import useAuthStore from '../store/useAuthStore'
import { useEffect, useState } from 'react'
import Lib_Navigation from '../library_components/Lib_Navigation'

const Lib_Catalog = () => {
      return(
         <section className="min-h-screen w-full bg-black/80 p-4">
            <div className="bg-white min-h-screen shadow-2xl w-full just-center items-center flex flex-col rounded-2xl pb-4">
                <Lib_Navigation/>
                
            </div>

        </section>
      )
}
export default Lib_Catalog