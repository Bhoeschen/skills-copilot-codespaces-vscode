function skillsMember() {
  return {
    name: 'skillsMember',
    restrict: 'E',
    templateUrl: 'app/member/skills-member.html',
    scope: {
      member: '='
    }
  };
}