import mixpanel from 'mixpanel-browser';

export default function(token) {
    return {
        created: () => {
            mixpanel.init(token);
        },
        methods: {
            track_pageview() {
                console.log('track_pageview');
                mixpanel.track_pageview();
            },
            track() {
                mixpanel.track('test')
            }
        }
    }
}