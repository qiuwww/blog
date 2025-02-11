//传入25维坐标 跟对应的25维出图角度及对应的矩阵信息 还有当地的平均海拔  返回 3维的坐标
function getNewPos3(x,y,z,mat23,heading,tilt,planez)
{
  z = 0;
  var pos_x,pos_y,pos_z;
  pos_x=x*mat23[0][0]+y*mat23[1][0]+z*mat23[2][0]+mat23[3][0];
  pos_y=x*mat23[0][1]+y*mat23[1][1]+z*mat23[2][1]+mat23[3][1];
  pos_z=x*mat23[0][2]+y*mat23[1][2]+z*mat23[2][2]+mat23[3][2];

  var dir_x,dir_y,dir_z; // 投影方向
  dir_x = Math.sin(heading * Math.PI / 180.0);
  dir_y = Math.cos(heading  * Math.PI / 180.0);
  dir_z = Math.tan(tilt* Math.PI / 180.0);

  // 计算_3v和平面plane的交点，此交点为真正的场景坐标
  var t = (planez - pos_z) / dir_z;
  pos_x = pos_x + dir_x * t;
  pos_y = pos_y + dir_y * t;
  pos_z = planez;
  //alert(pos_x+","+pos_y+","+pos_z);
  pos_x=pos_x+35000000;   //在x坐标前加上带号，然后进行高斯坐标向北京54坐标转换
  return GaoSiToBJ54(pos_x,pos_y);
}

//传入3维坐标 跟对应的25维出图角度及对应的矩阵信息 还有当地的平均海拔  返回 25维的坐标
function getNewPos2(x,y,z,mat,planez)
{
  z = planez;
  var pos_x,pos_y,pos_z;
  pos_x=x*mat[0][0]+y*mat[1][0]+z*mat[2][0]+mat[3][0];
  pos_y=x*mat[0][1]+y*mat[1][1]+z*mat[2][1]+mat[3][1];
//   pos.z=0;

  var point25d=[pos_x,pos_y];
  return point25d;
}

function getNewPosGaoSi(x,y,z,mat23,heading,tilt,planez)
{
  z = 0;
  var pos_x,pos_y,pos_z;
  pos_x=x*mat23[0][0]+y*mat23[1][0]+z*mat23[2][0]+mat23[3][0];
  pos_y=x*mat23[0][1]+y*mat23[1][1]+z*mat23[2][1]+mat23[3][1];
  pos_z=x*mat23[0][2]+y*mat23[1][2]+z*mat23[2][2]+mat23[3][2];

  var dir_x,dir_y,dir_z; // 投影方向
  dir_x = Math.sin(heading * Math.PI / 180.0);
  dir_y = Math.cos(heading  * Math.PI / 180.0);
  dir_z = Math.tan(tilt* Math.PI / 180.0);

  // 计算_3v和平面plane的交点，此交点为真正的场景坐标
  var t = (planez - pos_z) / dir_z;
  pos_x = pos_x + dir_x * t;
  pos_y = pos_y + dir_y * t;
  pos_z = planez;
  //alert(pos_x+","+pos_y+","+pos_z);
  //pos_x=pos_x+35000000;   //在x坐标前加上带号，然后进行高斯坐标向北京54坐标转换
  var posGaoSi=[pos_x,pos_y];
  return posGaoSi;
}
