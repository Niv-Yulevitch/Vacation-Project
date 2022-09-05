import express, {Request, Response, NextFunction} from "express";
import verifyAdmin from "../3-middleware/verify-admin";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import VacationModel from "../4-models/vacation-model";
import vacationsLogic from "../5-logic/vacations-logic";
import fs from "fs";
import locations from "../2-utils/locations";

const router = express.Router();

// GET http://localhost:3001/api/vacations/:userID
router.get("/api/vacations/:userID", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userID = +request.params.userID
        const vacations = await vacationsLogic.getAllVacations(userID);
        response.json(vacations);
    } catch (err: any) {
        next(err);
    }
});

// GET http://localhost:3001/api/vacations/:id
router.get("/api/vacations/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        const vacation = await vacationsLogic.getOneVacation(id);
        console.log(vacation)
        response.json(vacation);
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:3001/api/vacations
router.post("/api/vacations", verifyAdmin ,async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const addedVacation = await vacationsLogic.addVacation(vacation);
        response.status(201).json(addedVacation);
    } catch (err: any) {
        next(err);
    }
});

// PUT http://localhost:3001/api/vacations/:id
router.put("/api/vacations/:id", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image;
        const id = +request.params.id;
        request.body.id = id;
        const vacation = new VacationModel(request.body);
        const updatedVacation = await vacationsLogic.updateVacation(vacation);
        response.json(updatedVacation);
    } catch (err: any) {
        next(err);
    }
});

// DELETE http://localhost:3001/api/vacations/:id
router.delete("/api/vacations/:id", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        await vacationsLogic.deleteVacation(id);
        response.sendStatus(204);
    } catch (err: any) {
        next(err);
    }
});

router.get("/api/vacations/images/:imageName", (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;

        let imageFile = locations.getVacationImageFile(imageName);
        if(!fs.existsSync(imageFile)) imageFile = locations.notFoundImageFile;
        
        response.sendFile(imageFile)
    } catch (err: any) {
        next(err);
    }
})

export default router;