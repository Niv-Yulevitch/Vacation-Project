import { useState, useEffect, SyntheticEvent, ChangeEvent } from "react";
import { NavLink } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import { vacationsStore } from "../../../Redux/VacationsState";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import Loading from "../../SharedArea/Loading/Loading";
// import Pagination from "../AppPagination/AppPagination";
import VacationCard from "../VacationCard/VacationCard";
import AddIcon from "@mui/icons-material/Add";
import { Fab, Pagination } from "@mui/material";
import "./VacationList.css";

function VacationList(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const itemsPerPage = 8;
    const [page, setPage] = useState<number>(1);
    const [numOfPages, setNumOfPage] = useState<number>();

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
      };

    const user = authStore.getState().user

    useEffect(() => {
        vacationsService
            .getAllVacations(user.userID)
            .then((vacations) => setVacations(vacations))
            .catch((err) => notifyService.error(err));

        const unsubscribeVacations = vacationsStore.subscribe(() =>
            setVacations(vacationsStore.getState().vacations));
            
        setNumOfPage(Math.ceil(vacations.length / itemsPerPage))

        return () => { unsubscribeVacations() };
    }, [vacations]);

    return (
        <div className="VacationList">
            {vacations.length === 0 && <Loading />}

            {user.roleID === 1 && <>
                <NavLink to="/vacations/add">
                    <Fab color="primary" aria-label="add" className="AddVacationButton">
                        <AddIcon />
                    </Fab>
                </NavLink>
            </>}

            {vacations.slice((page-1) * itemsPerPage, page * itemsPerPage).map(vac => { return (<VacationCard key={vac.vacationID} vacation={vac} />)})}

            <Pagination count={numOfPages} page={page} onChange={handleChange} defaultPage={1} color="primary" size="large" showFirstButton showLastButton/>
        </div>
    );
}

export default VacationList;
