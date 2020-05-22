package MyApp;
use Mojo::Base 'Mojolicious';

sub startup {
    my $self = shift;

    my $config = $self->plugin('Config');

    $self->plugin('PODRenderer') if $config->{perldoc};

    my $r = $self->routes;

    $r->get('/calender')->to('calender#list');
    $r->get('/calender/month/:month')->to('calender#month');
    $r->get('/calender/day/:day')->to('calender#day');
    $r->post('/calender')->to('calender#create');
}

1;
