import { NavigateNext } from '@mui/icons-material';
import WeeklyCard from './WeeklyCard';

const WeeklyList = () => {
    return (
        <div className="w-full mt-2 px-5">
          <div className="flex justify-between items-center py-8">
            <h1 className="text-[17px] font-[500]">Weekly Highlight</h1>
            <span className="text-yellow-500">
              See all <NavigateNext />
            </span>
          </div>
          <div className="flex gap-5 lg:flex-row flex-col">
            {[1, 2, 3].map((_items) => (
              <WeeklyCard />
            ))}
          </div>
        </div>
      );
}

export default WeeklyList
