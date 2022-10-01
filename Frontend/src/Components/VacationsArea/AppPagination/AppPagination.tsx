import "./AppPagination.css";

interface PaginationProps {
    vacationsPerPage: number,
    totalVacations: number,
    paginate: Function
}

function AppPagination(props: PaginationProps): JSX.Element {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(props.totalVacations / props.vacationsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
            <ul className="pagination">
                {pageNumbers.map(num => (
                    <li key={num} className="page-item">
                        <a href="#!" onClick={() => props.paginate(num)} className="page-link">
                            {num}
                        </a>
                    </li>
                ))}
            </ul>
    );
}

export default AppPagination;
