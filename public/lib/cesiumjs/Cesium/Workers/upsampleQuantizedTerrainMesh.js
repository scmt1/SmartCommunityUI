define(["./when-cbf8cd21","./Check-35e1a91d","./Math-e66fad2a","./Cartesian2-72f33550","./Transforms-12e4beec","./RuntimeError-f4c64df1","./WebGLConstants-95ceb4e9","./ComponentDatatype-7ee14e67","./AttributeCompression-64a3d9e4","./IndexDatatype-66caba23","./IntersectionTests-27cc5733","./Plane-bbcdf4b1","./createTaskProcessorWorker","./EllipsoidTangentPlane-5d981468","./OrientedBoundingBox-710e3bd9","./TerrainEncoding-76333552"],function(w,e,ce,ge,me,t,i,n,s,xe,r,h,u,o,ve,we){"use strict";var Ce={clipTriangleAtAxisAlignedThreshold:function(e,t,i,n,s,r){var h,u,o;w.defined(r)?r.length=0:r=[],o=t?(h=i<e,u=n<e,s<e):(h=e<i,u=e<n,e<s);var a,p,d,f,l,c,g=h+u+o;return 1===g?h?(a=(e-i)/(n-i),p=(e-i)/(s-i),r.push(1),r.push(2),1!==p&&(r.push(-1),r.push(0),r.push(2),r.push(p)),1!==a&&(r.push(-1),r.push(0),r.push(1),r.push(a))):u?(d=(e-n)/(s-n),f=(e-n)/(i-n),r.push(2),r.push(0),1!==f&&(r.push(-1),r.push(1),r.push(0),r.push(f)),1!==d&&(r.push(-1),r.push(1),r.push(2),r.push(d))):o&&(l=(e-s)/(i-s),c=(e-s)/(n-s),r.push(0),r.push(1),1!==c&&(r.push(-1),r.push(2),r.push(1),r.push(c)),1!==l&&(r.push(-1),r.push(2),r.push(0),r.push(l))):2===g?h||i===e?u||n===e?o||s===e||(p=(e-i)/(s-i),d=(e-n)/(s-n),r.push(2),r.push(-1),r.push(0),r.push(2),r.push(p),r.push(-1),r.push(1),r.push(2),r.push(d)):(c=(e-s)/(n-s),a=(e-i)/(n-i),r.push(1),r.push(-1),r.push(2),r.push(1),r.push(c),r.push(-1),r.push(0),r.push(1),r.push(a)):(f=(e-n)/(i-n),l=(e-s)/(i-s),r.push(0),r.push(-1),r.push(1),r.push(0),r.push(f),r.push(-1),r.push(2),r.push(0),r.push(l)):3!==g&&(r.push(0),r.push(1),r.push(2)),r},computeBarycentricCoordinates:function(e,t,i,n,s,r,h,u,o){var a=i-h,p=h-s,d=r-u,f=n-u,l=1/(d*a+p*f),c=t-u,g=e-h,m=(d*g+p*c)*l,x=(-f*g+a*c)*l,v=1-m-x;return w.defined(o)?(o.x=m,o.y=x,o.z=v,o):new ge.Cartesian3(m,x,v)},computeLineSegmentLineSegmentIntersection:function(e,t,i,n,s,r,h,u,o){var a=(u-r)*(i-e)-(h-s)*(n-t);if(0!=a){var p=((h-s)*(t-r)-(u-r)*(e-s))/a,d=((i-e)*(t-r)-(n-t)*(e-s))/a;return 0<=p&&p<=1&&0<=d&&d<=1?(w.defined(o)||(o=new ge.Cartesian2),o.x=e+p*(i-e),o.y=t+p*(n-t),o):void 0}}},ye=32767,Be=16383,Ie=[],be=[],Ae=[],Te=new ge.Cartographic,ze=new ge.Cartesian3,Me=[],Ne=[],Ve=[],Ee=[],Re=[],He=new ge.Cartesian3,Oe=new me.BoundingSphere,Se=new ve.OrientedBoundingBox,Ue=new ge.Cartesian2,Fe=new ge.Cartesian3;function Pe(){this.vertexBuffer=void 0,this.index=void 0,this.first=void 0,this.second=void 0,this.ratio=void 0}Pe.prototype.clone=function(e){return w.defined(e)||(e=new Pe),e.uBuffer=this.uBuffer,e.vBuffer=this.vBuffer,e.heightBuffer=this.heightBuffer,e.normalBuffer=this.normalBuffer,e.index=this.index,e.first=this.first,e.second=this.second,e.ratio=this.ratio,e},Pe.prototype.initializeIndexed=function(e,t,i,n,s){this.uBuffer=e,this.vBuffer=t,this.heightBuffer=i,this.normalBuffer=n,this.index=s,this.first=void 0,this.second=void 0,this.ratio=void 0},Pe.prototype.initializeFromClipResult=function(e,t,i){var n=t+1;return-1!==e[t]?i[e[t]].clone(this):(this.vertexBuffer=void 0,this.index=void 0,this.first=i[e[n]],++n,this.second=i[e[n]],++n,this.ratio=e[n],++n),n},Pe.prototype.getKey=function(){return this.isIndexed()?this.index:JSON.stringify({first:this.first.getKey(),second:this.second.getKey(),ratio:this.ratio})},Pe.prototype.isIndexed=function(){return w.defined(this.index)},Pe.prototype.getH=function(){return w.defined(this.index)?this.heightBuffer[this.index]:ce.CesiumMath.lerp(this.first.getH(),this.second.getH(),this.ratio)},Pe.prototype.getU=function(){return w.defined(this.index)?this.uBuffer[this.index]:ce.CesiumMath.lerp(this.first.getU(),this.second.getU(),this.ratio)},Pe.prototype.getV=function(){return w.defined(this.index)?this.vBuffer[this.index]:ce.CesiumMath.lerp(this.first.getV(),this.second.getV(),this.ratio)};var a=new ge.Cartesian2,p=-1,d=[new ge.Cartesian3,new ge.Cartesian3],f=[new ge.Cartesian3,new ge.Cartesian3];function l(e,t){var i=d[++p],n=f[p],i=s.AttributeCompression.octDecode(e.first.getNormalX(),e.first.getNormalY(),i),n=s.AttributeCompression.octDecode(e.second.getNormalX(),e.second.getNormalY(),n);return ze=ge.Cartesian3.lerp(i,n,e.ratio,ze),ge.Cartesian3.normalize(ze,ze),s.AttributeCompression.octEncode(ze,t),--p,t}Pe.prototype.getNormalX=function(){return w.defined(this.index)?this.normalBuffer[2*this.index]:(a=l(this,a)).x},Pe.prototype.getNormalY=function(){return w.defined(this.index)?this.normalBuffer[2*this.index+1]:(a=l(this,a)).y};var g=[];function ke(e,t,i,n,s,r,h,u,o){if(0!==h.length){for(var a=0,p=0;p<h.length;)p=g[a++].initializeFromClipResult(h,p,u);for(var d=0;d<a;++d){var f,l,c=g[d];c.isIndexed()?(c.newIndex=r[c.index],c.uBuffer=e,c.vBuffer=t,c.heightBuffer=i,o&&(c.normalBuffer=n)):(f=c.getKey(),w.defined(r[f])?c.newIndex=r[f]:(l=e.length,e.push(c.getU()),t.push(c.getV()),i.push(c.getH()),o&&(n.push(c.getNormalX()),n.push(c.getNormalY())),c.newIndex=l,r[f]=l))}3===a?(s.push(g[0].newIndex),s.push(g[1].newIndex),s.push(g[2].newIndex)):4===a&&(s.push(g[0].newIndex),s.push(g[1].newIndex),s.push(g[2].newIndex),s.push(g[0].newIndex),s.push(g[2].newIndex),s.push(g[3].newIndex))}}return g.push(new Pe),g.push(new Pe),g.push(new Pe),g.push(new Pe),u(function(e,t){var i=e.isEastChild,n=e.isNorthChild,s=i?Be:0,r=i?ye:Be,h=n?Be:0,u=n?ye:Be,o=Me,a=Ne,p=Ve,d=Re;o.length=0,a.length=0,p.length=0,d.length=0;var f=Ee;f.length=0;for(var l={},c=e.vertices,g=(g=e.indices).subarray(0,e.indexCountWithoutSkirts),m=we.TerrainEncoding.clone(e.encoding),x=m.hasVertexNormals,v=e.exaggeration,w=0,C=e.vertexCountWithoutSkirts,y=e.minimumHeight,B=e.maximumHeight,I=new Array(C),b=new Array(C),A=new Array(C),T=x?new Array(2*C):void 0,z=0,M=0;z<C;++z,M+=2){var N,V=m.decodeTextureCoordinates(c,z,Ue),E=m.decodeHeight(c,z)/v,R=ce.CesiumMath.clamp(V.x*ye|0,0,ye),H=ce.CesiumMath.clamp(V.y*ye|0,0,ye);A[z]=ce.CesiumMath.clamp((E-y)/(B-y)*ye|0,0,ye),R<20&&(R=0),H<20&&(H=0),ye-R<20&&(R=ye),ye-H<20&&(H=ye),I[z]=R,b[z]=H,x&&(N=m.getOctEncodedNormal(c,z,Fe),T[M]=N.x,T[M+1]=N.y),(i&&Be<=R||!i&&R<=Be)&&(n&&Be<=H||!n&&H<=Be)&&(l[z]=w,o.push(R),a.push(H),p.push(A[z]),x&&(d.push(T[M]),d.push(T[M+1])),++w)}var O=[];O.push(new Pe),O.push(new Pe),O.push(new Pe);var S=[];for(S.push(new Pe),S.push(new Pe),S.push(new Pe),z=0;z<g.length;z+=3){var U=g[z],F=g[z+1],P=g[z+2],k=I[U],D=I[F],W=I[P];O[0].initializeIndexed(I,b,A,T,U),O[1].initializeIndexed(I,b,A,T,F),O[2].initializeIndexed(I,b,A,T,P);var X,K=Ce.clipTriangleAtAxisAlignedThreshold(Be,i,k,D,W,Ie);(X=0)>=K.length||(X=S[0].initializeFromClipResult(K,X,O))>=K.length||(X=S[1].initializeFromClipResult(K,X,O))>=K.length||(X=S[2].initializeFromClipResult(K,X,O),ke(o,a,p,d,f,l,Ce.clipTriangleAtAxisAlignedThreshold(Be,n,S[0].getV(),S[1].getV(),S[2].getV(),be),S,x),X<K.length&&(S[2].clone(S[1]),S[2].initializeFromClipResult(K,X,O),ke(o,a,p,d,f,l,Ce.clipTriangleAtAxisAlignedThreshold(Be,n,S[0].getV(),S[1].getV(),S[2].getV(),be),S,x)))}var L=i?-ye:0,Y=n?-ye:0,_=[],G=[],J=[],Z=[],j=Number.MAX_VALUE,q=-j,Q=Ae;Q.length=0;var $=ge.Ellipsoid.clone(e.ellipsoid),ee=ge.Rectangle.clone(e.childRectangle),te=ee.north,ie=ee.south,ne=ee.east,se=ee.west;for(ne<se&&(ne+=ce.CesiumMath.TWO_PI),z=0;z<o.length;++z)R=(R=Math.round(o[z]))<=s?(_.push(z),0):r<=R?(J.push(z),ye):2*R+L,o[z]=R,H=(H=Math.round(a[z]))<=h?(G.push(z),0):u<=H?(Z.push(z),ye):2*H+Y,a[z]=H,(E=ce.CesiumMath.lerp(y,B,p[z]/ye))<j&&(j=E),q<E&&(q=E),p[z]=E,Te.longitude=ce.CesiumMath.lerp(se,ne,R/ye),Te.latitude=ce.CesiumMath.lerp(ie,te,H/ye),Te.height=E,$.cartographicToCartesian(Te,ze),Q.push(ze.x),Q.push(ze.y),Q.push(ze.z);var re=me.BoundingSphere.fromVertices(Q,ge.Cartesian3.ZERO,3,Oe),he=ve.OrientedBoundingBox.fromRectangle(ee,j,q,$,Se),ue=new we.EllipsoidalOccluder($).computeHorizonCullingPointFromVerticesPossiblyUnderEllipsoid(re.center,Q,3,re.center,j,He),oe=q-j,ae=new Uint16Array(o.length+a.length+p.length);for(z=0;z<o.length;++z)ae[z]=o[z];var pe=o.length;for(z=0;z<a.length;++z)ae[pe+z]=a[z];for(pe+=a.length,z=0;z<p.length;++z)ae[pe+z]=ye*(p[z]-j)/oe;var de,fe,le=xe.IndexDatatype.createTypedArray(o.length,f);return x?(fe=new Uint8Array(d),t.push(ae.buffer,le.buffer,fe.buffer),de=fe.buffer):t.push(ae.buffer,le.buffer),{vertices:ae.buffer,encodedNormals:de,indices:le.buffer,minimumHeight:j,maximumHeight:q,westIndices:_,southIndices:G,eastIndices:J,northIndices:Z,boundingSphere:re,orientedBoundingBox:he,horizonOcclusionPoint:ue}})});
