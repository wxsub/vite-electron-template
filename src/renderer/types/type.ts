// userType 0:教练 1:学生家长 2:推荐人 3:小组组长 4:巡查员，5:交付中心负责人 6:学生 10:合伙人
export enum EMeetingUserType {
  /**
   * 教练
   */
  TEACHER,
  /**
   * 学生家长
   */
  STUDENT_PARENTS,
  /**
   * 推荐人
   */
  RECOMMENDER,
  /**
   * 小组组长
   */
  GROUP_LEADER,
  /**
   * 巡查员
   */
  PATROL,
  /**
   * 交付中心负责人
   */
  DELIVER_CENTER_MANAGER,
  /**
   * 学生
   */
  STUDENT,
  /**
   * 合伙人
   */
  PARTNER = 10,
}
export interface MeetingClassPersonVo {
  /**
   * 交付中心手机号
   */
  directorMobilePhone?: string;
  /**
   * 交付中心名称
   */
  directorName?: string;
  /**
   * 推荐人手机号
   */
  refereeMobilePhone?: string;
  /**
   * 推荐人名称
   */
  refereeName?: string;
  /**
   * 学生编号
   */
  studentCode?: string;
  /**
   * 学生id
   */
  studentId?: number;
  /**
   * 学生家长手机号 必选
   */
  studentMobilePhone?: string;
  /**
   * 学生名称 必选
   */
  studentName?: string;
  [property: string]: any;
}
export interface MeetingClassInfoVo {
  /**
   * 实际结束时间
   */
  actualEnd?: string;
  /**
   * 实际开始时间
   */
  actualStart?: string;
  /**
   * 实际上课人数
   */
  actualStudyNum?: number;
  /**
   * 是否调课
   */
  adjust?: number;
  /**
   * 班级编号
   */
  classCode?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 课程大类
   */
  curriculumId?: number;
  /**
   * 班级id
   */
  deliverClassId?: number;
  /**
   * 班级名称
   */
  deliverClassName?: string;
  /**
   * 交付中心商户号
   */
  deliverMerchant?: string;
  /**
   * 结束学习时间
   */
  endStudyTime?: string;
  /**
   * 结束学习时间
   * 结束学习时间时间戳
   */
  endTime?: number;
  /**
   * 是否试课
   */
  experience?: number;
  /**
   * 课时数量
   */
  hours?: number;
  id?: number;
  /**
   * 时长
   */
  planHour?: number;
  /**
   * 开始学习时间
   */
  startStudyTime?: string;
  /**
   * 开始学习时间
   * 开始学习时间时间戳
   */
  startTime?: number;
  /**
   * 课程状态：1正常，2请假
   */
  status?: number;
  /**
   * 学习内容
   */
  studyContent?: string;
  /**
   * 计划状态：0未学习，1学习中，2已结束
   */
  studyStatus?: number;
  /**
   * 教练id
   */
  teacherId?: number;
  /**
   * 授课方式
   */
  teachingType?: number;
  /**
   * 间时
   */
  timeStr?: string;
  /**
   * 类型，1学管添加，2，教练添加 3、时长补课
   */
  type?: number;
  /**
   * 修改时间
   */
  updateTime?: string;
  [property: string]: any;
}
export interface IMeetingClassAndSubjectInfoVo {
  /**
   * 班级编码
   */
  classCode?: string;
  /**
   * 班级名称
   */
  className?: string;
  /**
   * 班级下的成员信息
   */
  classPersonInfoList?: MeetingClassPersonVo[];
  /**
   * 课程
   */
  classPlanStudy?: MeetingClassInfoVo[];
  /**
   * 教练手机号
   */
  teacherMobilePhone?: string;
  /**
   * 教练名称
   */
  teacherName?: string;
  [property: string]: any;
}
// 鼎校登录
export interface registerInfo {
  tokenType: string;
  tokenHeader: string;
  token: string;
  expiresAt: string;
  principalName: string;
  refreshIssuedAt: string;
  callbackData: string;
  deviceInfo: string;
  additionalParameters: string;
}

export interface LoginUserInfo {
  username: string;
  userUuid: string;
  userToken: string;
  nickname: string;
  privateMeetingNum: string;
  initialPassword?: boolean;
  shortMeetingNum: string;
  sipCid: string;
  avatar: string;
  phoneNumber: string;
  email: string;
  id: string;
  userMobilePhone: string;
  userId: string;
  nickName: string;
  createTime: string;
  status: string;
  userType: EMeetingUserType;
  errMsg: string;
  settings: Record<string, any>;
  serviceBundle: {
    name: string;
    meetingMaxMinutes: number;
    meetingMaxMembers: number;
  };
}

export interface listItem {
  id: string;
  meetingId: string;
  meetingNum: string;
  startTime: string;
  endTime: string;
  destroyTime: string;
  password: string;
  state: string;
  meetingShortNum: string;
  roomArchiveId: string;
  userMobilePhone: string;
  userNickName: string;
  userId: string;
  studentMobilePhone: string;
  studentName: string;
  refereeMobilePhone: string;
  refereeName: string;
  leaderMobilePhone: string;
  leaderName: string;
  observerMobilePhone: string;
  observerName: string;
  directorMobilePhone: string;
  meetingStartBegin: string;
  sharedScreenStart: string;
  sharedScreenEnd: string;
  studentCode: string;
  studentUuid: string;
  studentToken: string;
  inviteUrl: string;
}
export interface meetingList {
  date: string;
  dateStr: string;
  list: listItem[];
}
export interface StudentSchoolHourVo { 
  merchantCode: string;
  merchantName: string;
  haveDeliverHours:number
}

//录制的类型声明
export interface RecordInfoList {
  id: number;
  meetingId: number;
  subject: string;
  owner: string;
  startTime: number;
  stopTime: number;
  duration: number;
  fileFormat: string;
  recordUrl: string;
  recordSize: number;
  videoId: string;
  taskId: string;
  createTime: string;
  updateTime: string;
  expiredDay: number;
}

export interface RecordInfo {
  currentPage: number;
  totalPage: number;
  size: number;
  totalItems: number;
  data: RecordInfoList[];
}

export interface haveReviewMinute { 
  merchantCode: string;
  merchantName: string;
  haveDeliverHours: number;
}

export interface getStudentInfo {
	length: number;
	json(): any;
  studentCode: string;
  studentName: string;
  type: number;
  studentSchoolHourVos: Array<StudentSchoolHourVo>;
  haveReviewMinutes: Array<haveReviewMinute>;
  reviewType: number; 
  curriculumId: number;
  teacherId: number;
  deliverMerchant:string;
}
export interface ClassPlanStudy { 
  id: number;
  deliverClassId: number;
  deliverClassName: string;
  teacherId: number;
  deliverMerchant: string;
  startStudyTime: string;
  endStudyTime: string;
  hours: number;
  actualStart: string;
  actualEnd: string;
  studyStatus: number;
  status: number;
  teachingType: number;
  adjust: number;
  experience: number;
  type: number;
  planHour: number;
  curriculumId: number;
  classCode: string;
  actualStudyNum: string;
  createTime: string;
  updateTime: string;
  studyContent: string;
  ClassName: string;
  startTime: number;
  endTime: number;
  timeStr:string;
}
export interface ClassPersonInfo { 
  directorName: string;
  directorMobilePhone: string;
  refereeName: string;
  refereeMobilePhone: string;
  studentId: number;
  studentMobilePhone: string;
  studentName: string;
  studentCode: string;
}

export interface getClassInfo {
	length: number;
  className: string;
  classCode: string;
  teacherMobilePhone: string;
  teacherName: string;
  classPlanStudy: Array<ClassPlanStudy>;
  classPersonInfoList:Array<ClassPersonInfo>
}
export interface studentList {
  id: string;
  studentCode: string;
  memberCode: string;
  loginName: string;
  loginPwd: string;
  realName: string;
  grade: string;
  school: string;
  address: string;
  regTime: string;
  isEnable: string;
  restrictedUse: string;
  gender: string;
  useModule: string;
  isFormal: string;
  archive: string;
  archived: string;
  voiceModel: string;
}

