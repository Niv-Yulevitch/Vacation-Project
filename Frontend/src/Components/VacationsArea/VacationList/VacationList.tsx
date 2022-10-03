import { useState, useEffect } from "react";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/VacationModel";
import { vacationsStore } from "../../../Redux/VacationsState";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import Loading from "../../SharedArea/Loading/Loading";
import Pagination from "../AppPagination/AppPagination";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationList.css";

interface VacationListProps {
    user: UserModel;
}

function VacationList(props: VacationListProps): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [vacationsPerPage] = useState<number>(8);

    useEffect(() => {
        vacationsService
            .getAllVacations(props.user.userID)
            .then((vacations) => setVacations(vacations))
            .catch((err) => notifyService.error(err));

        const unsubscribeVacations = vacationsStore.subscribe(() => 
            vacationsService.getAllVacations(props.user.userID)
                .then((vacations) => setVacations(vacations))
                .catch(err => notifyService.error(err)));
        return unsubscribeVacations;
    }, [vacations]);
    
    // Pagination Area: --------------------------------------------------------------------
    const indexOfLastVacation = currentPage * vacationsPerPage;
    const indexOfFirstVacation = indexOfLastVacation - vacationsPerPage;
    const currentVacations = vacations.slice(indexOfFirstVacation, indexOfLastVacation);

    const paginate = (pageNumber:number) => setCurrentPage(pageNumber)
    // -------------------------------------------------------------------------------------

    return (
        <div className="VacationList">
            {vacations.length === 0 && <Loading />}

            {currentVacations.map((v) => (
                <VacationCard key={v.vacationID} vacation={v} />
            ))}
            <Pagination vacationsPerPage={vacationsPerPage} totalVacations={vacations.length} paginate={paginate}/>
        </div>
    );
}

export default VacationList;
