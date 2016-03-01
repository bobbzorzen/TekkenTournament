#!/usr/bin/python
# -*- coding: UTF-8 -*-# enable debugging
import json
import MySQLdb
import os
import cgi


def getAllPlayers():
    db = MySQLdb.connect(host="localhost", user="root", passwd="", db="tekken")
    data = [];

    cur = db.cursor()

    cur.execute("SELECT Players.name, COUNT(Matches.player) as score FROM Players LEFT JOIN Matches ON Players.player_id=Matches.player WHERE Matches.status=1 OR Matches.player IS NULL GROUP BY Players.name ORDER BY score DESC")

    for row in cur.fetchall():
        data.append({"name":row[0],"score":row[1]})

    db.close()
    return data

def addPlayer(name):
    db = MySQLdb.connect(host="localhost", user="root", passwd="", db="tekken")
    data = [];

    cur = db.cursor()

    cur.execute("INSERT INTO Players(name) VALUES(%s)", (name,))
    retval = cur.fetchall()
    db.commit()
    db.close()

    return retval


try:
    data = []
    arguments = cgi.FieldStorage()
    if os.environ['REQUEST_METHOD'] == 'GET':
        data = getAllPlayers()
    elif os.environ['REQUEST_METHOD'] == 'POST':
        if arguments and ('name' in arguments.keys()) and arguments.getvalue('name'):
            data = addPlayer(arguments.getvalue('name'))
        else:
            data = {"status": "ERROR", "message": "Missing name parameter"}
    else:
        raise Exception('Unsupported request method')


    print "Content-type: application/json\n"
    print json.dumps(data)
except Exception, e:
    print "Status:500\nContent-type: application/json\n"
    data = {"status": "ERROR", "message": str(e[1])}
    print json.dumps(data)




