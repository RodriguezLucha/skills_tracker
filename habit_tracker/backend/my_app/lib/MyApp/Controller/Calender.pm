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

    return $c->render( json => $data );
}

sub delete {
    my $c           = shift;
    my $pg          = Mojo::Pg->new('postgresql://postgres@/habit_tracker');
    my $calender_id = $c->param('calender_id');

    $pg->db->delete( 'calender', { id => $calender_id } );

    return $c->render( json => { data => $calender_id } );
}

sub update_status {
    my $c  = shift;
    my $pg = Mojo::Pg->new('postgresql://postgres@/habit_tracker');

    my $day    = $c->param('day');
    my $status = $c->param('status');

    $pg->db->update( 'day', { status => "$status" }, { id => $day } );

    return $c->render( json => { data => "done" } );
}

sub update_note {
    my $c  = shift;
    my $pg = Mojo::Pg->new('postgresql://postgres@/habit_tracker');

    my $day  = $c->param('day');
    my $note = $c->param('note');

    $pg->db->update( 'day', { note => "$note" }, { id => $day } );

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
        $data->{ $row->{'calender_id'} }{'month'} = $row->{'month'};
    }

    $result = $pg->db->query('select * from calender c;')->hashes;
    @rows   = @$result;
    foreach my $row (@rows) {
        $data->{ $row->{'id'} }{'name'} = $row->{'name'};
    }

    return $c->render( json => { data => $data ? $data : {} } );
}

sub monthv2 {
    my $c      = shift;
    my $pg     = Mojo::Pg->new('postgresql://postgres@/habit_tracker');
    my $month  = $c->param('month');
    my $result = $pg->db->query(
        'select *, day.id as day_id from day join calender
         on calender.id = day.calender_id where month = ?', ($month)
    )->hashes;

    my $output = { id => $month };

    # "id","day","month","year","grid_position","day_of_week","status","note","calender_id","id","name","year","day_id"
    # 1956,5,May,2020,0,Tuesday,Complete,"2.3 miles",6,6,Running,2020,1956

    my @rows = @$result;

    my $data;
    foreach my $row (@rows) {
        $data->{'calenders'}{ $row->{'calender_id'} }{'days'}
          { $row->{'day_id'} } = {
            day         => $row->{'day'},
            day_of_week => $row->{'day_of_week'},
            id          => $row->{'day_id'},
            note        => $row->{'note'},
            status      => $row->{'status'}
          };
        $data->{'calenders'}{ $row->{'calender_id'} }{'name'} = $row->{'name'};
    }

    # "calenders": {
    #     "6": {
    #       "days": {
    #         "1952": {
    #           "day_of_week": "Friday",
    #           "id": 1952,
    #           "note": "2.3 miles",

    my @calenders = ();
    foreach
      my $calender_id ( sort { $a <=> $b } keys %{ $data->{'calenders'} } )
    {
        my @days = ();
        foreach my $day_id ( sort { $a <=> $b }
            keys %{ $data->{'calenders'}{$calender_id}{days} } )
        {
            push @days,
              {
                day => $data->{'calenders'}{$calender_id}{days}{$day_id}{day},
                day_of_week => $data->{'calenders'}{$calender_id}{days}{$day_id}{day_of_week},
                id   => $data->{'calenders'}{$calender_id}{days}{$day_id}{id},
                note => $data->{'calenders'}{$calender_id}{days}{$day_id}{note},
                status => $data->{'calenders'}{$calender_id}{days}{$day_id}{status},
              };
        }

        push @calenders,
          {
            id   => $calender_id,
            name => $data->{'calenders'}{$calender_id}{'name'},
            days => \@days
          };
    }
    $output->{calenders} = \@calenders;

    return $c->render( json => $output );
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

    my $time = 1577869261;    # Jan 1st, 2020

    my ( $sec, $min, $hour, $month_day, $month_num_zero_based, $year_add_1900,
        $day_of_week, $yday, $isdst )
      = localtime(time);

    my $debug = $day_of_week;

    my $result = {};
    $result->{id} = $id;
    $result->{name} = $name;

    my @days = ();

    foreach my $counter ( 1 .. 365 + 1 ) {

        my ( $sec, $min, $hour, $month_day, $month_num_zero_based,
            $year_add_1900, $day_of_week, $yday, $isdst )
          = localtime($time);

        my $obj = {
            calender_id   => $id,
            day           => $month_day,
            month         => $months{$month_num_zero_based},
            year          => $year_add_1900 + 1900,
            grid_position => 0,
            day_of_week   => $days_of_week{$day_of_week},
            status        => $NOT_SET,
        };

        $pg->db->insert( 'day' , $obj);
        $time += 86400;
        push @days, $obj;
    }

    $result->{days} = \@days;
    return $c->render( json => $result );
}

1;
