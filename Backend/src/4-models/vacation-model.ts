import { UploadedFile } from "express-fileupload";
import Joi from "joi";

class VacationModel {
    public id: number;
    public destination: string;
    public description: string;
    public image: UploadedFile
    public imageName: string;
    public fromDate: Date;
    public untilDate: Date;
    public price: number;

    public constructor(vacation: VacationModel) {
        this.id = vacation.id;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.image = vacation.image;
        this.imageName = vacation.imageName;
        this.fromDate = vacation.fromDate;
        this.untilDate = vacation.untilDate;
        this.price = vacation.price;
    };

    private static validationSchema = Joi.object({
        id: Joi.number().optional().positive().integer(),
        destination: Joi.string().required().min(2).max(50),
        description: Joi.string().required().min(2).max(550),
        image: Joi.object().optional(),
        imageName: Joi.string().optional().max(150),
        fromDate: Joi.date().greater('now').required().iso(),
        untilDate: Joi.date().greater(Joi.ref('fromDate')).required().iso(),
        price: Joi.number().required().positive()
    });

    public validate(): string {
        const result = VacationModel.validationSchema.validate(this);
        return result.error?.message;
    };
}

export default VacationModel;