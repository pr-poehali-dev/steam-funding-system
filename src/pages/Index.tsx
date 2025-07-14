import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [requests, setRequests] = useState([
    { id: 1, steamLogin: 'player123', amount: 1000, contact: 'telegram: @player123', status: 'pending', date: '2024-01-15' },
    { id: 2, steamLogin: 'gamer456', amount: 500, contact: 'email: gamer@mail.com', status: 'approved', date: '2024-01-14' },
    { id: 3, steamLogin: 'user789', amount: 2000, contact: 'telegram: @user789', status: 'completed', date: '2024-01-13' }
  ]);

  const [newRequest, setNewRequest] = useState({
    steamLogin: '',
    amount: '',
    contact: ''
  });

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const request = {
      id: requests.length + 1,
      ...newRequest,
      amount: parseInt(newRequest.amount),
      status: 'pending' as const,
      date: new Date().toISOString().split('T')[0]
    };
    setRequests([...requests, request]);
    setNewRequest({ steamLogin: '', amount: '', contact: '' });
  };

  const updateRequestStatus = (id: number, status: string) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status } : req
    ));
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-yellow-500';
      case 'approved': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'pending': return 'В ожидании';
      case 'approved': return 'Одобрено';
      case 'completed': return 'Выполнено';
      case 'rejected': return 'Отклонено';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-md border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Gamepad2" className="text-purple-400" size={32} />
              <h1 className="text-2xl font-bold text-white">SteamBoost</h1>
            </div>
            <nav className="flex items-center space-x-6">
              <a href="#services" className="text-white hover:text-purple-400 transition-colors">Услуги</a>
              <a href="#reviews" className="text-white hover:text-purple-400 transition-colors">Отзывы</a>
              <a href="#support" className="text-white hover:text-purple-400 transition-colors">Поддержка</a>
              <Button
                variant={isAdmin ? "default" : "outline"}
                onClick={() => setIsAdmin(!isAdmin)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Icon name="Shield" size={16} className="mr-2" />
                {isAdmin ? 'Выйти' : 'Админ'}
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-white mb-6">
              Пополнение Steam
              <span className="text-purple-400"> Быстро и Безопасно</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Пополняем Steam кошелёк за 5 минут. Работаем 24/7. Комиссия всего 5%
            </p>
            <div className="flex justify-center space-x-4">
              <Badge className="bg-green-500 text-white px-4 py-2">
                <Icon name="Check" size={16} className="mr-2" />
                Мгновенно
              </Badge>
              <Badge className="bg-blue-500 text-white px-4 py-2">
                <Icon name="Shield" size={16} className="mr-2" />
                Безопасно
              </Badge>
              <Badge className="bg-orange-500 text-white px-4 py-2">
                <Icon name="Zap" size={16} className="mr-2" />
                Без комиссии
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue={isAdmin ? "admin" : "request"} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="request">Заявка</TabsTrigger>
            <TabsTrigger value="services">Услуги</TabsTrigger>
            <TabsTrigger value="reviews">Отзывы</TabsTrigger>
            <TabsTrigger value="admin">
              <Icon name="Settings" size={16} className="mr-2" />
              Админ
            </TabsTrigger>
          </TabsList>

          {/* Request Form */}
          <TabsContent value="request">
            <Card className="max-w-2xl mx-auto bg-slate-800/50 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Icon name="CreditCard" className="mr-2 text-purple-400" />
                  Создать заявку на пополнение
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Заполните форму, и мы пополним ваш Steam кошелёк
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitRequest} className="space-y-4">
                  <div>
                    <Label htmlFor="steamLogin" className="text-white">Steam логин</Label>
                    <Input
                      id="steamLogin"
                      value={newRequest.steamLogin}
                      onChange={(e) => setNewRequest({...newRequest, steamLogin: e.target.value})}
                      placeholder="Введите ваш Steam логин"
                      className="bg-slate-700 border-slate-600 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="amount" className="text-white">Сумма пополнения (руб.)</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={newRequest.amount}
                      onChange={(e) => setNewRequest({...newRequest, amount: e.target.value})}
                      placeholder="1000"
                      className="bg-slate-700 border-slate-600 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact" className="text-white">Контакты</Label>
                    <Textarea
                      id="contact"
                      value={newRequest.contact}
                      onChange={(e) => setNewRequest({...newRequest, contact: e.target.value})}
                      placeholder="Telegram: @username или email"
                      className="bg-slate-700 border-slate-600 text-white"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                    <Icon name="Send" size={16} className="mr-2" />
                    Отправить заявку
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services */}
          <TabsContent value="services">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Icon name="Zap" className="mr-2 text-orange-400" />
                    Быстрое пополнение
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">Пополнение за 5-10 минут</p>
                  <div className="text-2xl font-bold text-white mb-2">5%</div>
                  <p className="text-gray-400">комиссия</p>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Icon name="Shield" className="mr-2 text-blue-400" />
                    Безопасность
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">Гарантия безопасности аккаунта</p>
                  <div className="text-2xl font-bold text-white mb-2">100%</div>
                  <p className="text-gray-400">гарантия</p>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Icon name="Clock" className="mr-2 text-green-400" />
                    Круглосуточно
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">Работаем 24/7 без выходных</p>
                  <div className="text-2xl font-bold text-white mb-2">24/7</div>
                  <p className="text-gray-400">поддержка</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reviews */}
          <TabsContent value="reviews">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Icon name="Star" className="mr-2 text-yellow-400" />
                    Отличный сервис!
                  </CardTitle>
                  <CardDescription className="text-gray-300">@gamer123</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Пополнил Steam за 3 минуты. Всё честно и быстро. Рекомендую!</p>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Icon name="Star" className="mr-2 text-yellow-400" />
                    Надёжно
                  </CardTitle>
                  <CardDescription className="text-gray-300">@player456</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Уже третий раз пополняю через этот сервис. Никаких проблем, всё работает отлично.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Icon name="Star" className="mr-2 text-yellow-400" />
                    Быстро и удобно
                  </CardTitle>
                  <CardDescription className="text-gray-300">@user789</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Очень удобный интерфейс, быстрое пополнение. Буду пользоваться ещё!</p>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Icon name="Star" className="mr-2 text-yellow-400" />
                    Поддержка огонь
                  </CardTitle>
                  <CardDescription className="text-gray-300">@steamfan</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Возникли вопросы, поддержка ответила моментально. Профессионально!</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Admin Panel */}
          <TabsContent value="admin">
            {isAdmin ? (
              <div className="space-y-6">
                <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Icon name="Users" className="mr-2 text-purple-400" />
                      Панель администратора
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Управление заявками на пополнение
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {requests.map((request) => (
                        <Card key={request.id} className="bg-slate-700/50 border-slate-600">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-4">
                                  <div>
                                    <p className="text-white font-semibold">{request.steamLogin}</p>
                                    <p className="text-gray-400 text-sm">{request.contact}</p>
                                  </div>
                                  <Badge className={getStatusColor(request.status)}>
                                    {getStatusText(request.status)}
                                  </Badge>
                                </div>
                                <div className="mt-2 flex items-center space-x-4">
                                  <span className="text-green-400 font-bold">{request.amount} руб.</span>
                                  <span className="text-gray-400 text-sm">{request.date}</span>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateRequestStatus(request.id, 'approved')}
                                  className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                  <Icon name="Check" size={16} />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateRequestStatus(request.id, 'completed')}
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                  <Icon name="CheckCheck" size={16} />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateRequestStatus(request.id, 'rejected')}
                                  className="bg-red-600 hover:bg-red-700 text-white"
                                >
                                  <Icon name="X" size={16} />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Alert className="bg-slate-800/50 border-purple-500/20">
                <Icon name="Lock" className="h-4 w-4 text-purple-400" />
                <AlertDescription className="text-gray-300">
                  Для доступа к админ-панели нажмите кнопку "Админ" в шапке сайта
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Support Section */}
      <section id="support" className="py-16 bg-black/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Поддержка</h3>
            <p className="text-gray-300">Нужна помощь? Мы всегда на связи!</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20 text-center">
              <CardContent className="p-6">
                <Icon name="MessageCircle" className="mx-auto text-blue-400 mb-4" size={48} />
                <h4 className="text-white font-semibold mb-2">Telegram</h4>
                <p className="text-gray-300">@steamboost_support</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20 text-center">
              <CardContent className="p-6">
                <Icon name="Mail" className="mx-auto text-green-400 mb-4" size={48} />
                <h4 className="text-white font-semibold mb-2">Email</h4>
                <p className="text-gray-300">support@steamboost.ru</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20 text-center">
              <CardContent className="p-6">
                <Icon name="Phone" className="mx-auto text-purple-400 mb-4" size={48} />
                <h4 className="text-white font-semibold mb-2">Телефон</h4>
                <p className="text-gray-300">+7 (999) 123-45-67</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Icon name="Gamepad2" className="text-purple-400" size={24} />
              <span className="text-white font-bold">SteamBoost</span>
            </div>
            <p className="text-gray-400">© 2024 SteamBoost. Быстрое и безопасное пополнение Steam</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;