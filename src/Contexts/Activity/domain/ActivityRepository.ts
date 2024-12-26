import Activity from './Activity';

export default interface ActivityRepository {
  create(activity: Activity): Promise<Activity | null>;
}
