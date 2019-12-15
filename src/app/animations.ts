import {
    trigger,
    animate,
    transition,
    style,
    query,
    group,
    animateChild,
    stagger
  } from '@angular/animations';
export const fadeAnimation = trigger('fadeAnimation', [
    transition('* <=> *', [
      query(':enter, :leave', style({opacity: 1 })),
      group([
        query(':enter', [
          style({ opacity: 0 }),
          animate('1000ms ease-in-out', style({ opacity: 1 }))
        ]),
        query(':leave', [
          style({ opacity: 1 }),
          animate('1000ms ease-in-out', style({ opacity: 0 }))]),
      ])
    ])
  ]);


export const slideInAnimation =
trigger('slideInAnimation', [
  transition('* <=> *', [
    style({ position: 'absolute' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: '50%',
        left: 0,
        width: '100%'
      })
    ]),
    query(':enter', [
      style({ left: '-100%'})
    ]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('2s ease-out', style({ left: '100%'}))
      ]),
      query(':enter', [
        animate('2s ease-out', style({ left: '0%'}))
      ])
    ]),
    query(':enter', animateChild()),
  ])]);
export const routerTransition = trigger('routerTransition', [
    transition('* <=> *', [
        /* order */
        /* 1 */ query(':enter, :leave', []),
        /* 2 */ query('.block', style({ opacity: 0 })),
        /* 3 */ group([  // block executes in parallel
        query(':enter', []),
        query(':leave', []),
        ]),
        /* 4 */ query(':enter .block', stagger(400, [
        style({ transform: 'translateY(100px)' }),
        animate('1s ease-in-out',
            style({ transform: 'translateY(0px)', opacity: 1 })),
        ])),
    ])
]);
export const slideInAnimation2 =
   trigger('slideInAnimation2', [
        transition('Buckets => Login', [
             query(':enter, :leave',
                  style({ position: 'fixed', top: '50%', width: '100%' }),
                  { optional: true }),
             group([
                  query(':enter', [
                      style({ transform: 'translateX(-100%)' }),
                      animate('0.5s ease-in-out',
                      style({ transform: 'translateX(0%)' }))
                  ], { optional: true }),
                  query(':leave', [
                      style({ transform:   'translateX(0%)'}),
                      animate('0.5s ease-in-out',
                      style({ transform: 'translateX(100%)' }))
                  ], { optional: true }),
             ])
    ]),
    transition('* => Login', [
        query(':enter, :leave',
             style({ position: 'fixed', top: '0%',  width: '100%' }),
             { optional: true }),
        group([
             query(':enter', [
                 style({ transform: 'translateY(-500px)'}),
                 animate('0.5s ease-in-out',
                 style({ transform: 'translateY(500px)' }))
             ], { optional: true })
        ])
    ]),
    transition('Buckets => Bucket', [
      query(':enter, :leave',
           style({ position: 'fixed', top: '50%', width: '100%' }),
           { optional: true }),
      group([
           query(':enter', [
               style({ transform: 'translateX(100%)' }),
               animate('0.5s ease-in-out',
               style({ transform: 'translateX(0%)' }))
           ], { optional: true }),
           query(':leave', [
               style({ transform:   'translateX(0%)'}),
               animate('0.5s ease-in-out',
               style({ transform: 'translateX(-100%)' }))
           ], { optional: true }),
      ])
    ]),
    transition('Login => Buckets', [
        query(':enter, :leave',
             style({ position: 'fixed', top: '50%', width: '100%' }),
             { optional: true }),
        group([
             query(':enter', [
                 style({ transform: 'translateX(100%)' }),
                 animate('0.5s ease-in-out',
                 style({ transform: 'translateX(0%)' }))
             ], { optional: true }),
             query(':leave', [
                 style({ transform:   'translateX(0%)'}),
                 animate('0.5s ease-in-out',
                 style({ transform: 'translateX(-100%)' }))
             ], { optional: true }),
        ])
])]);
