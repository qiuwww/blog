//  高斯投影是正形投影的一种，同一坐标系中的高斯投影换带计算公式是根据正形投影原理推导出的两个高斯坐标系间的显函数式。在同一大地坐标系中(例如1954北京坐标系或1980西安坐标系)，
//如果两个高斯坐标系只是主子午线的经度不同，那么显函数式前的系数可以根据坐标系使用的椭球元素和主子午线经度唯一确定。但如果两个高斯坐标系除了主子午线的经度不同以外，还存在其他线性系，
//则将线性变换公式代入换带计算的显函数式中，仍然可以得到严密的坐标变换公式。此时显函数式前的系数等价于使用两个坐标系主子午线的经度和线性变换参数联合求解得到的，可以唯一确定。

//3度带宽54北京坐标系
//高斯投影由大地坐标(Unit:Metres)反算经纬度(Unit:DD)
function  GaoSiToBJ54( X,  Y)
{
  var ProjNo; var ZoneWide; ////带宽
  var longitude1,latitude1, longitude0, X0,Y0, xval,yval;
  var e1,e2,f,a, ee, NN, T,C, M, D,R,u,fai, iPI;
  iPI = 0.0174532925199433; ////3.1415926535898/180.0;
  a = 6378245.0; f = 1.0/298.3; //54年北京坐标系参数
////a=6378140.0; f=1/298.257; //80年西安坐标系参数
  ZoneWide = 3; ////3度带宽
  ProjNo = parseInt(X/1000000) ; //查找带号
//longitude0 = (ProjNo-1) * ZoneWide + ZoneWide/2 ; //6度带
  longitude0 = (ProjNo-1) * ZoneWide + ZoneWide ;
  longitude0 = longitude0 * iPI ; //中央经线
  X0 = ProjNo*1000000+500000;
  Y0 = 0;
  xval = X-X0; yval = Y-Y0; //带内大地坐标
  e2 = 2*f-f*f;
  e1 = (1.0-Math.sqrt(1-e2))/(1.0+Math.sqrt(1-e2));
  ee = e2/(1-e2);
  M = yval;
  u = M/(a*(1-e2/4-3*e2*e2/64-5*e2*e2*e2/256));
  fai = u+(3*e1/2-27*e1*e1*e1/32)*Math.sin(2*u)+(21*e1*e1/16-55*e1*e1*e1*e1/32)*Math.sin(
    4*u)+(151*e1*e1*e1/96)*Math.sin(6*u)+(1097*e1*e1*e1*e1/512)*Math.sin(8*u);
  C = ee*Math.cos(fai)*Math.cos(fai);
  T = Math.tan(fai)*Math.tan(fai);
  NN = a/Math.sqrt(1.0-e2*Math.sin(fai)*Math.sin(fai));
  R = a*(1-e2)/Math.sqrt((1-e2*Math.sin(fai)*Math.sin(fai))*(1-e2*Math.sin(fai)*Math.sin(fai))*(1-e2*Math.sin
  (fai)*Math.sin(fai)));
  D = xval/NN;
//计算经度(Longitude)纬度(Latitude)
  // longitude1 = longitude0+(D-(1+2*T+C)*D*D*D/3+(5-2*C+28*T-3*C*C+8*ee+24*T*T)*D*D*D*D*D/120)/Math.Cos(fai); //6度带
  longitude1 = longitude0+(D-(1+2*T+C)*D*D*D/3+(5-2*C+28*T-3*C*C+8*ee+24*T*T)*D
    *D*D*D*D/120)/Math.cos(fai);
  latitude1 = fai -(NN*Math.tan(fai)/R)*(D*D/2-(5+3*T+10*C-4*C*C-9*ee)*D*D*D*D/24
    +(61+90*T+298*C+45*T*T-256*ee-3*C*C)*D*D*D*D*D*D/720);
//转换为度DD
  var _Lon = longitude1 / iPI;
  var _Lat = latitude1 / iPI;

  var point_bj54=[_Lon,_Lat];
  return point_bj54;
//alert(_Lon+","+_Lat);
}

//高斯投影由经纬度(Unit:DD)正算平面坐标(含带号，Unit:Metres)
function BJ54ToGaoSi( longitude,  latitude)
{
  var ProjNo=0; var ZoneWide; ////带宽
  var longitude1,latitude1, longitude0, X0,Y0, xval,yval;
  var a,f, e2,ee, NN, T,C,A, M, iPI;
  iPI = 0.0174532925199433; ////3.1415926535898/180.0;
  ZoneWide =3; ////3度带宽
  a=6378245.0; f=1.0/298.3; //54年北京坐标系参数
////a=6378140.0; f=1/298.257; //80年西安坐标系参数
//ProjNo = (int)(longitude / ZoneWide) ;  //6度带
  ProjNo = parseInt((longitude-1.5) / ZoneWide);
//longitude0 = ProjNo * ZoneWide + ZoneWide / 2;  //3度带
  longitude0 = ProjNo * ZoneWide + ZoneWide ;
  longitude0 = longitude0 * iPI ;
  longitude1 = longitude * iPI ; //经度转换为弧度
  latitude1 = latitude * iPI ; //纬度转换为弧度
  e2=2*f-f*f;
  ee=e2*(1.0-e2);
  NN=a/Math.sqrt(1.0-e2*Math.sin(latitude1)*Math.sin(latitude1));
  T=Math.tan(latitude1)*Math.tan(latitude1);
  C=ee*Math.cos(latitude1)*Math.cos(latitude1);
  A=(longitude1-longitude0)*Math.cos(latitude1);
  M=a*((1-e2/4-3*e2*e2/64-5*e2*e2*e2/256)*latitude1-(3*e2/8+3*e2*e2/32+45*e2*e2
    *e2/1024)*Math.sin(2*latitude1)+(15*e2*e2/256+45*e2*e2*e2/1024)*Math.sin(4*latitude1)-(35*e2*e2*e2/3072)*Math.sin(6*latitude1));
  // xval = NN*(A+(1-T+C)*A*A*A/6+(5-18*T+T*T+72*C-58*ee)*A*A*A*A*A/120);  //6度带
  xval = NN*(A+(1-T+C)*A*A*A/3+(5-18*T+T*T+72*C-58*ee)*A*A*A*A*A/120);  //3度带
  yval = M+NN*Math.tan(latitude1)*(A*A/2+(5-T+9*C+4*C*C)*A*A*A*A/24
    +(61-58*T+T*T+600*C-330*ee)*A*A*A*A*A*A/720);
  X0 =1000000*(ProjNo+1)+500000;
  Y0 = 0;
  xval = xval+X0; yval = yval+Y0;
  var _X = xval;
  var _Y = yval;

  _X=_X-35000000;

  var point_gaosi=[_X,_Y];
  return point_gaosi;
}

//NN卯酉圈曲率半径，测量学里面用N表示
//M为子午线弧长，测量学里用大X表示
//fai为底点纬度，由子午弧长反算公式得到，测量学里用Bf表示
//R为底点所对的曲率半径，测量学里用Nf表

