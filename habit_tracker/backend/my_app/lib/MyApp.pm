package MyApp;
use Mojo::Base 'Mojolicious';

sub startup {
    my $self = shift;

    my $config = $self->plugin('Config');

    $self->plugin('PODRenderer') if $config->{perldoc};

    my $r = $self->routes;

    $r->get('/calender')->to('calender#list');
    $r->delete('/calender/:calender_id')->to('calender#delete');
    $r->get('/calender/month/:month')->to('calender#month');
    $r->get('/calender/day/:day')->to('calender#day');
    $r->post('/calender/day/:day/status')->to('calender#update_status');
    $r->post('/calender/day/:day/note')->to('calender#update_note');
    $r->post('/calender')->to('calender#create');
}

1;
