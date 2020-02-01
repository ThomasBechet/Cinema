import { keyframes, style,animate } from '@angular/animations';

export const dislike = [
  style({ opacity: 1 }),
  style({ transform: 'translate3d(200%, 0, 0) rotate3d(0, 0, 1, 120deg)', opacity: 0 }),
]

export const like = [
  style({ opacity: 1 }),
  style({ transform: 'translate3d(-200%, 0, 0) rotate3d(0, 0, 1, -120deg)', opacity: 0 }),
]

export const unseen = [
    style({ opacity: 1 }),
    style({ transform: 'translate3d(0, -200%, 0) rotate3d(0, 0, 1, -120deg)', opacity: 0 }),
  ]
  

