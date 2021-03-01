import { NewPupilNotifications } from 'src/app/core/models/new-pupil-notifications';
import { NewTutorNotifications } from 'src/app/core/models/new-tutor-notifications';

export interface SettingsViewData {
  newPupilNotifications: NewPupilNotifications;
  newTutorNotifications: NewTutorNotifications;
}
