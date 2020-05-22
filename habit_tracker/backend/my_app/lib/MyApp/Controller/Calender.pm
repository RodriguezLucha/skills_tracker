package MyApp::Controller::Calender;

use Mojo::Base 'Mojolicious::Controller';

sub list {
    my $c = shift;

    return $c->render( json => { calender => ["what."] } );
}

sub create {
    my $c    = shift;
    my $year = $c->param('year');

    return $c->render( json => { year => $year } );
}

1;
