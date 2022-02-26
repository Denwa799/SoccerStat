export const matchStatusTranslation = (status: string) => {
  switch (status) {
    case 'SCHEDULED':
      return 'Запланирован';
    case 'LIVE':
      return 'В прямом эфире';
    case 'IN_PLAY':
      return 'В игре';
    case 'PAUSED':
      return 'Пауза';
    case 'FINISHED':
      return 'Завершен';
    case 'POSTPONED':
      return 'Отложен';
    case 'SUSPENDED':
      return 'Приостановлен';
    case 'CANCELED':
      return 'Отменен';
    default:
      return status;
  }
};
