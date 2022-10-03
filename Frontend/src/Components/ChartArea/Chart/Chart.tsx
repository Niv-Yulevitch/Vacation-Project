import "./Chart.css";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";
import VacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import { authStore } from "../../../Redux/AuthState";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function Chart(): JSX.Element {
    const user = authStore.getState().user

    const [vacations, setVacations] = useState<VacationModel[]>([]);

    useEffect(() => {
        vacationsService
            .getAllVacations(user.userID)
            .then((vacations) => setVacations(vacations))
            .catch((err) => notifyService.error(err));
    }, []);

    const labels = vacations.map(v => v.destination)
    const data1 = vacations.map(v => v.followersCount)

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Vacations Followers',
            },
        },
    };


    const data = {
        labels,
        datasets: [
            {
                label: 'Vacation',
                data: data1,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    return (
        <div className="Chart">
            <Bar options={options} data={data} />
        </div>
    );
}

export default Chart;
