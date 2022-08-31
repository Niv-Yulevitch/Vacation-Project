import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  IconButtonProps,
  styled,
  Collapse,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VacationModel from "../../../Models/VacationModel";
import "./VacationCard.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface VacationCardProps {
  vacation: VacationModel;
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function VacationCard(props: VacationCardProps): JSX.Element {
  const newFromDateFormat = new Date(props.vacation.fromDate).toISOString();
  const fromDate = newFromDateFormat.split("T",1);

  const newUntilDateFormat = new Date(props.vacation.untilDate).toISOString();
  const untilDate = newUntilDateFormat.split("T",1);

  const [follow, setFollow] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const handleFollowClick = () => {
    setFollow((current) => !current);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="VacationCard">
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader title={props.vacation.destination} subheader={fromDate + " ➡️ " + untilDate}/>
        <CardMedia
          component="img"
          height="194"
          image={`http://localhost:3001/api/vacations/images/${props.vacation.imageName}`}
          alt="Paella dish"
        />
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={handleFollowClick}>
            <FavoriteIcon
              style={{ color: follow ? "red" : "" }}
            />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="body2" color="text.secendery">
              <b>Description:</b> {props.vacation.description}
            </Typography>
            <Typography variant="body2" color="text.secendery">
              <b>Price:</b> {props.vacation.price}$
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}

export default VacationCard;
