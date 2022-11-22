《变量名命名规范》

主要的（学生信息）	变量名people有老师和学生两种类型
stu_name	学生名字
sno	学号
class	班级
academy	学院
phone	手机号
stu_type	学生类别
fdy_name	辅导员名字
campus	校区
subDate	提交日期
pass_fdy	辅导员是否审批
pass_jwc	教务处是否审批
pass_sj	书记是否审批
region	地点
leaveSubmitState 离校提交情况 类型是number 0为未提交 1为已提交
backSubmitState 返校提交情况 类型是number 0为未提交 1为已提交
stu_id 用于保存学生卡片的_id
dakaSubmitState 打卡提交
---

（1）学生离校请假
leaveDate		离校日期
leaveReason	请假理由

---

（2）学生返校申请
conveyance	交通方式
timeofconveyance	交通班次
setDate 出发时间
arriveDate  到校时间
imgList      图片证明集
inresidence	是否住宿，有true，false

---
（3）学生课程请假
absenceDate	缺席课程的日期
lessonName	缺席课程的名字
lessonTime	缺席课程的节次
teacherName	缺席课程的老师名字
absenceReason	缺课理由
----
（4）学生打卡信息
无

---
（5）离校审批
advice 审批意见
destination 离校类别
checkState 审批情况



主要的(老师信息)
tch_name	老师名字
tch_type		老师类别，有fdy（辅导员），jwc（教务处），sj（书记）
sno	老师的工号 
academy	     学院
respectiveStuNum	每个老师所管的学生人数

totalStuNum	总学生人数
