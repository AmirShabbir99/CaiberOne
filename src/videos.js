import p1 from "./assets/p1.mp4";
import p2 from "./assets/p2.mp4";
import p3 from "./assets/p3.mp4";
import p4 from "./assets/p4.mp4";
import p6 from "./assets/p6.mp4";
import p7 from "./assets/p7.mp4";
import p11 from "./assets/p11.mp4";
import p33 from "./assets/p33.mp4";
import p44 from "./assets/p44.mp4";
import p55 from "./assets/p55.mp4";
import poster from "./assets/p8.jpeg";
// Native red videos (no grade filter needed). hero/process/cta are blue and get the red grade.
export const v = { p1, p2, p3, p4, p6, p7, p11, p33, p44, p55 };
export { poster };
// CSS brightness multipliers measured from each clip's mean/peak luminance so every background reads bright.
export const boost = { [p1]: 1, [p2]: 1, [p3]: 1.25, [p4]: 3, [p6]: 1.7, [p7]: 3, [p11]: 1.9, [p33]: 2.2, [p44]: 2, [p55]: 2 };
