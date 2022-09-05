import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { IdNotFoundError, ValidationError } from "../4-models/client-errors";
import VacationModel from "../4-models/vacation-model";
import { v4 as uuid } from "uuid";
import safeDelete from "../2-utils/safe-delete";

//* Get all vacations:
async function getAllVacations(userID: number): Promise<VacationModel[]> {
  //* Create sql:
  const sql = `SELECT DISTINCT
                V.*,
                EXISTS (SELECT * FROM followers WHERE vacationID = F.vacationID AND userID = ${userID}) AS isFollowing,
                COUNT (F.userID) AS followersCount
                FROM vacations AS V LEFT JOIN followers AS F
                ON V.vacationID = F.vacationID
                GROUP BY vacationID
                ORDER BY isFollowing DESC`;

  //* Get data from database:
  const vacations = await dal.execute(sql);

  //* Return it:
  return vacations;
}

async function getOneVacation(id: number): Promise<VacationModel> {
  const sql = `SELECT
                  * 
                  FROM vacations
                  WHERE vacation vacationID = ${id}`;

  const vacations = await dal.execute(sql); // returns empty array if not found

  const vacation = vacations[0];

  if (!vacation) throw new IdNotFoundError(id);

  return vacation;
}

//* Add new vacation:
async function addVacation(vacation: VacationModel): Promise<VacationModel> {
  const error = vacation.validate();
  if (error) throw new ValidationError(error);

  if (vacation.image) {
    const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf(".")); // .gif / .png / .jpg / .jpeg
    vacation.imageName = uuid() + extension;
    await vacation.image.mv("./src/1-assets/images/" + vacation.imageName); // mv = move = copy image.
    delete vacation.image; // Delete File before saving.
  }

  const sql = `INSERT INTO vacations(destination, description, imageName,fromDate,untilDate,price)
                    VALUES('${vacation.destination}', '${vacation.description}', '${vacation.imageName}', '${vacation.fromDate}', '${vacation.untilDate}', ${vacation.price})`;

  const result: OkPacket = await dal.execute(sql);

  vacation.id = result.insertId;

  return vacation;
}

//* Update vacation:
async function updateVacation(vacation: VacationModel): Promise<VacationModel> {
  const error = vacation.validate();
  if (error) throw new ValidationError(error);

  if (vacation.image) {
    await safeDelete("./src/1-assets/images/" + vacation.imageName);
    const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf(".")); // .gif / .png / .jpg / .jpeg
    vacation.imageName = uuid() + extension;
    await vacation.image.mv("./src/1-assets/images/" + vacation.imageName); // mv = move = copy image.
    delete vacation.image; // Delete File before saving.
  }

  const sql = `UPDATE vacations SET
                    destination = "${vacation.destination}",
                    description = ${vacation.description},
                    imageName = ${vacation.imageName},
                    fromDate = ${vacation.fromDate},
                    untilDate = ${vacation.untilDate},
                    price = ${vacation.price},
                    WHERE vacationID = ${vacation.id}`;

  const result: OkPacket = await dal.execute(sql);

  if (result.affectedRows === 0) throw new IdNotFoundError(vacation.id);

  return vacation;
}

//* Delete vacation:
async function deleteVacation(id: number): Promise<void> {
  const sql = `DELETE FROM vacations
                    WHERE vacationID = ${id}`;

  const result: OkPacket = await dal.execute(sql);

  if (result.affectedRows === 0) throw new IdNotFoundError(id);
}

export default {
  getAllVacations,
  getOneVacation,
  addVacation,
  updateVacation,
  deleteVacation,
};
