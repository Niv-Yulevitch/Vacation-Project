import axios from "axios";
import VacationModel from "../Models/VacationModel";
import {
  VacationsAction,
  VacationsActionType,
  vacationsStore,
} from "../Redux/VacationsState";

class VacationsService {
  // Get all vacations from backend:
  public async getAllVacations(): Promise<VacationModel[]> {
    // Take vacations resides in redux global state:
    let vacations = vacationsStore.getState().vacations;

    // If we have no vacations in global state - fetch them from server:
    if (vacations.length === 0) {
      // Fetch all vacations from backend:
      const response = await axios.get<VacationModel[]>(
        "http://localhost:3001/api/vacations/"
      );

      // Extract vacations from axios response:
      vacations = response.data;

      // Save fetched vacations in global state:
      const action: VacationsAction = {
        type: VacationsActionType.FetchVacations,
        payload: vacations
      };
      vacationsStore.dispatch(action); // Redux will call vacationReducer to perform this action.
    }

    // Return vacations:
    return vacations;
  }

  // Get one vacation by id
  public async getOneVacation(id: number): Promise<VacationModel> {
    // Desired vacation:
    let vacation;

    // Take vacations resides in redux global state:
    let vacations = vacationsStore.getState().vacations;

    // If we have no vacations in global state - fetch given vacation from server:
    if (vacations.length === 0) {
      // Fetch one vacation from backend:
      const response = await axios.get<VacationModel>(
        "http://localhost:3001/api/vacations/" + id
      );

      // Save fetched vacation:
      vacation = response.data;
    } else {
      // Take vacation from redux:
      vacation = vacations.find((p) => p.id === id);
    }

    // Return vacation:
    return vacation;
  }

  // Add new vacation:
  public async addVacation(vacation: VacationModel): Promise<void> {
    // Convert VacationModel into FormData because we need to send text + image:
    const formData = new FormData();
    formData.append("destination", vacation.destination);
    formData.append("description", vacation.description);
    formData.append("image", vacation.image[0]);
    formData.append("fromDate", vacation.fromDate.toString());
    formData.append("untilDate", vacation.untilDate.toString());
    formData.append("price", vacation.price.toString());

    // Send vacation to backend:
    const response = await axios.post<VacationModel>(
      "http://localhost:3001/api/vacations",
      formData
    );
    const addedVacation = response.data;

    // Send added vacation to redux global state:
    const action: VacationsAction = {
      type: VacationsActionType.AddVacation,
      payload: addedVacation
    };
    vacationsStore.dispatch(action); // Redux will call vacationReducer to perform this action.
  }

  // Update vacation:
  public async updateVacation(vacation: VacationModel): Promise<void> {
    // Convert VacationModel into FormData because we need to send text + image:
    const formData = new FormData();
    formData.append("destination", vacation.destination);
    formData.append("description", vacation.description);
    formData.append("image", vacation.image[0]);
    formData.append("fromDate", vacation.fromDate.toString());
    formData.append("untilDate", vacation.untilDate.toString());
    formData.append("price", vacation.price.toString());

    // Send vacation to backend:
    const response = await axios.put<VacationModel>(
      "http://localhost:3001/api/vacations/" + vacation.id,
      formData
    );
    const updatedVacation = response.data;

    // Send updated vacation to redux global state:
    const action: VacationsAction = {
      type: VacationsActionType.UpdateVacation,
      payload: updatedVacation
    };
    vacationsStore.dispatch(action); // Redux will call vacationReducer to perform this action.
  }

  // Delete vacation:
  public async deleteVacation(id: number): Promise<void> {

    // Delete this vacation in backend:
    await axios.delete("http://localhost:3001/api/vacations/" + id);

    // Delete this vacation also in redux global state:
    const action: VacationsAction = {
        type: VacationsActionType.DeleteVacation,
        payload: id
      };
      vacationsStore.dispatch(action); // Redux will call vacationReducer to perform this action.

  }
}

const vacationsService = new VacationsService();

export default vacationsService;
