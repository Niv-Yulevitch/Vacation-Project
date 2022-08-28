class VacationModel {
    public id: number;
    public destination: string;
    public description: string;
    public image: FileList
    public imageName: string;
    public fromDate: Date;
    public untilDate: Date;
    public price: number;
}

export default VacationModel