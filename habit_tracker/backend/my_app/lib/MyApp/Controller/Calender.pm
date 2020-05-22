package MyApp::Controller::Calender;

use Mojo::Base 'Mojolicious::Controller';
use Mojo::Pg;

sub list {
    my $c    = shift;
    my $pg   = Mojo::Pg->new('postgresql://postgres@/habit_tracker');
    my $data = $pg->db->query('select * from calender')->hashes;
    return $c->render( json => { data => $data } );
}

sub create {
    my $c    = shift;
    my $pg   = Mojo::Pg->new('postgresql://postgres@/habit_tracker');
    my $year = $c->param('year');
    my $name = $c->param('name');

    my $id = $pg->db->insert(
        'calender',
        { name      => 'Running', year => 2020 },
        { returning => 'id' }
    )->hash->{id};

    return $c->render( json => { id => $id } );
}

1;
