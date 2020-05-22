package MyApp::Controller::Calender;

use Mojo::Base 'Mojolicious::Controller';
use Mojo::Pg;

sub list {
    my $c = shift;
    return $c->render( json => { calender => ["what."] } );
}

sub create {
    my $c    = shift;
    my $year = $c->param('year');

    my $pg  = Mojo::Pg->new('postgresql://postgres@/habit_tracker');
    my $ver = $pg->db->query('select * from ht_calender')->hash;

    return $c->render( json => { year => $year, ver => $ver } );
}

1;
