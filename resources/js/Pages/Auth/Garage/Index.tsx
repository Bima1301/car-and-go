import Guest from "@/Layouts/GuestLayout";
import TableGarage from "./components/table/TableGarage";
import { Head } from "@inertiajs/react";

export default function Garage() {
     return (
          <Guest>
               <Head title="Garage" />
               <div className="pt-24 lg:px-[100px] md:px-8 px-4">
                    <TableGarage />
               </div>
          </Guest>
     )
}
