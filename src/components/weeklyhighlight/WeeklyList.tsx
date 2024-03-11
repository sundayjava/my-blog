import { NavigateNext } from '@mui/icons-material';
import WeeklyCard from './WeeklyCard';

type BlogData = {
  id: string;
  createdAt: string;
  category: string;
  heading: string;
  mainbody: string;
  middlehead: string;
  photoURL: string;
  subheading: string;
};

const WeeklyList = (props:{item:BlogData[]}) => {
    return (
        <div className="w-full mt-2 px-5">
          <div className="flex justify-between items-center py-8">
            <h1 className="text-[17px] font-[500]">Weekly Highlight</h1>
            <span className="text-yellow-500">
              See all <NavigateNext />
            </span>
          </div>
          <div className="flex gap-5 lg:flex-row flex-col">
            {props.item.slice(0,3).map((items) => (
              <WeeklyCard key={items.id} item={items}/>
            ))}
          </div>
        </div>
      );
}

export default WeeklyList
