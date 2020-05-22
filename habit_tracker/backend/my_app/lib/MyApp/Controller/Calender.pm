package MyApp::Controller::Calender;
use strict;
use warnings;

use Mojo::Base 'Mojolicious::Controller';
use Mojo::Pg;

my %months = (
    0  => 'January',
    1  => 'February',
    2  => 'March',
    3  => 'April',
    4  => 'May',
    5  => 'June',
    6  => 'July',
    7  => 'August',
    8  => 'September',
    9  => 'October',
    10 => 'November',
    11 => 'December'
);

my %days_of_week = (
    0 => 'Sunday',
    1 => 'Monday',
    2 => 'Tuesday',
    3 => 'Wednesday',
    4 => 'Thursday',
    5 => 'Friday',
    6 => 'Saturday'
);

my $NOT_SET    = 'Not Set';
my $COMPLETE   = 'Complete';
my $INCOMPLETE = 'Incomplete';

sub list {
    my $c    = shift;
    my $pg   = Mojo::Pg->new('postgresql://postgres@/habit_tracker');
    my $data = $pg->db->query('select * from calender')->hashes;
    return $c->render( json => { data => $data } );
}

sub update_status {
    my $c  = shift;
    my $pg = Mojo::Pg->new('postgresql://postgres@/habit_tracker');

    my $day    = $c->param('day');
    my $status = $c->param('status');

    print "day - $day, status - $status\n";

    $pg->db->update( 'day', { status => "$status" }, { id => $day } );

    return $c->render( json => { data => "done" } );
}

sub month {
    my $c      = shift;
    my $pg     = Mojo::Pg->new('postgresql://postgres@/habit_tracker');
    my $month  = $c->param('month');
    my $result = $pg->db->query(
        'select *, day.id as day_id from day join calender
         on calender.id = day.calender_id where month = ?', ($month)
    )->hashes;

    my @rows = @$result;
    my $data;
    foreach my $row (@rows) {
        $data->{ $row->{'calender_id'} }{'days'}{ $row->{'day'} } = $row;
    }

    $result = $pg->db->query('select * from calender c;')->hashes;
    @rows   = @$result;
    foreach my $row (@rows) {
        $data->{ $row->{'id'} }{'name'} = $row->{'name'};
    }

    return $c->render( json => { data => $data } );
}

sub create {
    my $c    = shift;
    my $pg   = Mojo::Pg->new('postgresql://postgres@/habit_tracker');
    my $year = $c->param('year');
    my $name = $c->param('name');

    my $id = $pg->db->insert(
        'calender',
        { name      => $name, year => $year },
        { returning => 'id' }
    )->hash->{id};

    my @days = ();
    my $time = 1577869261;    # Jan 1st, 2020

    my ( $sec, $min, $hour, $month_day, $month_num_zero_based, $year_add_1900,
        $day_of_week, $yday, $isdst )
      = localtime(time);

    my $debug = $day_of_week;

    foreach my $counter ( 1 .. 365 + 1 ) {

        my ( $sec, $min, $hour, $month_day, $month_num_zero_based,
            $year_add_1900, $day_of_week, $yday, $isdst )
          = localtime($time);

        $pg->db->insert(
            'day',
            {
                calender_id   => $id,
                day           => $month_day,
                month         => $months{$month_num_zero_based},
                year          => $year_add_1900 + 1900,
                grid_position => 0,
                day_of_week   => $days_of_week{$day_of_week},
                status        => $NOT_SET,
                note          => '-'
            }
        );

        $time += 86400;
    }

    return $c->render( json => { id => $id, debug => $debug } );
}

1;
