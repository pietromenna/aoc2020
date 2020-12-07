package day01

import (
	"io/ioutil"
	"strconv"
	"strings"
	"testing"
)

func PartOne(input string) int {
	numbers := make(map[int]int)
	lines := strings.Split(input, "\n")
	for _,l := range lines {
		if n, e := strconv.Atoi(l); e == nil {
			numbers[n] = 2020 - n
		}
	}

	for k, v := range numbers {
		if _, ok := numbers[v]; ok {
			return k * v
		}
	}

	return 0
}

func Test_PartOne(t *testing.T) {
	testData := "1721\n979\n366\n299\n675\n1456"
	expectedResult := 514579
	if r := PartOne(testData); r != expectedResult {
		t.Errorf("Got %d, expected %d", r, expectedResult )
	}
}

func Test_PartOneMyInput(t *testing.T) {
	myInput, e := ioutil.ReadFile("input.txt")
	if e != nil {
		panic(e)
	}
	testData := string(myInput)
	expectedResult := 73371
	if r := PartOne(testData); r != expectedResult {
		t.Errorf("Got %d, expected %d", r, expectedResult )
	}
}