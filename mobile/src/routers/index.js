import LoadingScreen from '../screens/loading/Loading';

import LoginScreen from '../screens/login/';
import RegisterScreen from '../screens/register/';
import RegisterSuccessScreen from '../screens/registersuccess';
import ForgotPasswordScreen from '../screens/forgotpassword/';
import ForgotPasswordOTPScreen from '../screens/forgotpasswordOTP';
import ChangePasswordScreen from '../screens/changepassword';
import ForgotPasswordSuccessScreen from '../screens/forgotpasswordsuccess';

import BottomTabScreen from '../bottom_navigation/';

import ProfileScreen from '../screens/profile/';
import Notify from '../screens/profile/notify';
import ExamDone from '../screens/profile/examdone';
import FeedBack from '../screens/profile/feedback';

import SelectUser from '../screens/selectuser';
import Service from '../screens/selectuser/services';
import Pay from '../screens/selectuser/pay';
import PaySuccess from '../screens/selectuser/paysuccess';

import LessonScreen from '../bottom_navigation/screens/home/lesson';
import DetailLesson from '../bottom_navigation/screens/home/lesson/detail';

import PracticeScreen from '../bottom_navigation/screens/exam/create-exam/startPractice';
import ResultPracticeScreen from '../bottom_navigation/screens/exam/create-exam/resultPractice';

import CreateExamScreen from '../bottom_navigation/screens/exam/create-exam';
import ContentQuestionScreen from '../bottom_navigation/screens/exam/create-exam/ContentQuestion';
import CommentScreen from '../bottom_navigation/screens/comment';
import BlogDetailScreen from '../bottom_navigation/screens/home/blog-detail';
import PageQuestion from '../bottom_navigation/screens/bottom_center/pageQuestion';
import BankQuestion from '../bottom_navigation/screens/exam/create-exam/BankQuestion';
import Exercise from '../bottom_navigation/screens/home/lesson/detail/Exercise';
import ResultExercise from '../bottom_navigation/screens/home/lesson/detail/ResultExercise';

export const Routers = [
  {
    key: 1,
    name: 'LoadingScreen',
    component: LoadingScreen,
    options: {headerShown: false},
  },
  {
    key: 2,
    component: LoginScreen,
    name: 'LoginScreen',
    options: {headerShown: false},
  },
  {
    key: 3,
    component: RegisterScreen,
    name: 'RegisterScreen',
    options: {headerShown: false},
  },
  {
    key: 4,
    component: RegisterSuccessScreen,
    name: 'RegisterSuccessScreen',
    options: {headerShown: false},
  },
  {
    key: 5,
    name: 'ForgotPasswordScreen',
    component: ForgotPasswordScreen,
    options: {headerShown: false},
  },
  {
    key: 6,
    name: 'ChangePasswordScreen',
    component: ChangePasswordScreen,
    options: {headerShown: false},
  },
  {
    key: 7,
    name: 'ForgotPasswordOTPScreen',
    component: ForgotPasswordOTPScreen,
    options: {headerShown: false},
  },
  {
    key: 8,
    name: 'ForgotPasswordSuccessScreen',
    component: ForgotPasswordSuccessScreen,
    options: {headerShown: false},
  },
  {
    key: 9,
    component: BottomTabScreen,
    name: 'Dashboard',
    options: {headerShown: false},
  },
  {
    key: 10,
    component: ProfileScreen,
    name: 'ProfileScreen',
    options: {headerShown: false},
  },
  {
    key: 11,
    component: SelectUser,
    name: 'SelectUser',
    options: {
      headerShown: false,
    },
  },
  {
    key: 12,
    component: Service,
    name: 'Service',
    options: {headerShown: false},
  },
  {
    key: 13,
    component: Pay,
    name: 'Pay',
    options: {headerShown: false},
  },
  {
    key: 14,
    component: PaySuccess,
    name: 'PaySuccess',
    options: {headerShown: false},
  },
  {
    key: 15,
    component: Notify,
    name: 'Notify',
    options: {headerShown: false},
  },
  {
    key: 16,
    component: ExamDone,
    name: 'ExamDone',
    options: {headerShown: false},
  },
  {
    key: 17,
    component: FeedBack,
    name: 'FeedBack',
    options: {headerShown: false},
  },

  //exam
  {
    key: 18,
    component: CreateExamScreen,
    name: 'CreateExamScreen',
    options: {headerShown: false},
  },

  {
    key: 20,
    component: ContentQuestionScreen,
    name: 'ContentQuestionScreen',
    options: {headerShown: false},
  },

  //lesson
  {
    key: 21,
    component: LessonScreen,
    name: 'LessonScreen',
    options: {headerShown: false},
  },
  {
    key: 22,
    component: DetailLesson,
    name: 'DetailLesson',
    options: {headerShown: false},
  },
  {
    key: 23,
    component: PracticeScreen,
    name: 'PracticeScreen',
    options: {headerShown: false},
  },
  {
    key: 24,
    component: ResultPracticeScreen,
    name: 'ResultPracticeScreen',
    options: {headerShown: false},
  },

  {
    key: 25,
    component: CommentScreen,
    name: 'CommentScreen',
    options: {headerShown: false},
  },

  {
    key: 26,
    component: BlogDetailScreen,
    name: 'BlogDetailScreen',
    options: {headerShown: false},
  },
  {
    key: 27,
    component: PageQuestion,
    name: 'PageQuestion',
    options: {headerShown: false},
  },

  {
    key: 28,
    component: BankQuestion,
    name: 'BankQuestion',
    options: {headerShown: false},
  },
  {
    key: 29,
    component: Exercise,
    name: 'Exercise',
    options: {headerShown: false},
  },
  {
    key: 30,
    component: ResultExercise,
    name: 'ResultExercise',
    options: {headerShown: false},
  },
];
